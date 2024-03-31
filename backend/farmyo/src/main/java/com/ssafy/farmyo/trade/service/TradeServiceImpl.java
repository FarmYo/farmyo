package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.blockchain.service.TradeContractService;
import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.*;
import com.ssafy.farmyo.trade.dto.*;
import com.ssafy.farmyo.trade.repository.TradeDepositRepository;
import com.ssafy.farmyo.trade.repository.TradeRepository;
import com.ssafy.farmyo.trade.repository.TradeWithdrawalRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {

    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ChatRepository chatRepository;
    private final CropRepository cropRepository;
    private final TradeDepositRepository tradeDepositRepository;
    private final TradeWithdrawalRepository tradeWithdrawalRepository;
    private final TradeContractService tradeContractService;

    @Override
    public void createTrade(TradeReqDto tradeReqDto) {
        Trade trade;

        // seller 가져오기
        User seller = userRepository.findByLoginId(tradeReqDto.getSellerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        // buyer 가져오기
        User buyer = userRepository.findByLoginId(tradeReqDto.getBuyerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        // boardId 가져오기
        Board board = boardRepository.findById(tradeReqDto.getBoardId()).orElseThrow(() -> new CustomException(ExceptionType.BOARD_NOT_EXIST));
        // cropId 가져오기
        Crop crop = cropRepository.findById(tradeReqDto.getCropId()).orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));

        // chatId 가져오기
        Chat chat;
        if (chatRepository.findById(tradeReqDto.getChatId()).isPresent()) { // 만약 chat이 있다면
            chat = chatRepository.findById(tradeReqDto.getChatId()).get();
            // trade 생성
            trade = Trade.builder()
                    .tradePrice(tradeReqDto.getTradePrice())
                    .tradeQuantity(tradeReqDto.getTradeQuantity())
                    .buyer(buyer)
                    .seller(seller)
                    .chat(chat)
                    .crop(crop)
                    .board(board)
                    .build();

        } else { // 만약 chat이 없다면
            // trade 생성
            trade = Trade.builder()
                    .tradePrice(tradeReqDto.getTradePrice())
                    .tradeQuantity(tradeReqDto.getTradeQuantity())
                    .buyer(buyer)
                    .seller(seller)
                    .crop(crop)
                    .board(board)
                    .build();

        }
        
        // trade 저장
        tradeRepository.save(trade);
        log.info("{} : (service)거래 생성 완료", trade);
    }


    @Override
    @Transactional
    public TradeListReqDto getTrades(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        log.info("user : {}", user);

        // user가 판매자인지 구매자인지 확인
        int job = user.getJob();

        log.info("{} : user job", job);

        if (job == 0) { // user가 판매자라면
            List<Trade> finish = tradeRepository.findAllBySellerAndTradeStatus(id, 3);
            List<Trade> notFinish = tradeRepository.findAllBySellerAndTradeStatusNot(id, 3);
            List<TradeListDto> selNot = new ArrayList<>();
            List<TradeListDto> sel = new ArrayList<>();

            for (Trade trade : notFinish) {
                TradeListDto tradeListDto = TradeListDto.builder()
                        .id(trade.getId())
                        .cropImg(trade.getCrop().getCropImgUrl())
                        .nickname(trade.getBuyer().getNickname())
                        .boardTitle(trade.getBoard().getBoardTitle())
                        .tradePrice(trade.getTradePrice())
                        .tradeQuantity(trade.getTradeQuantity())
                        .tradeStatus(trade.getTradeStatus())
                .build();

                selNot.add(tradeListDto);
            }

            for (Trade trade : finish) {
                TradeListDto tradeListDto = TradeListDto.builder()
                        .id(trade.getId())
                        .cropImg(trade.getCrop().getCropImgUrl())
                        .nickname(trade.getBuyer().getNickname())
                        .boardTitle(trade.getBoard().getBoardTitle())
                        .tradePrice(trade.getTradePrice())
                        .tradeQuantity(trade.getTradeQuantity())
                        .tradeStatus(trade.getTradeStatus())
                        .build();

                sel.add(tradeListDto);
            }

            return TradeListReqDto.builder()
                    .FinishedList(sel)
                    .NotFinishedList(selNot)
                    .build();

        } else { // user가 구매자라면
            List<Trade> finish = tradeRepository.findAllByBuyerAndTradeStatus(id, 3);
            List<Trade> notFinish = tradeRepository.findAllByBuyerAndTradeStatusNot(id, 3);
            List<TradeListDto> buyNot = new ArrayList<>();
            List<TradeListDto> buy = new ArrayList<>();

            for (Trade trade : notFinish) {
                TradeListDto tradeListDto = TradeListDto.builder()
                        .id(trade.getId())
                        .cropImg(trade.getCrop().getCropImgUrl())
                        .nickname(trade.getSeller().getNickname())
                        .boardTitle(trade.getBoard().getBoardTitle())
                        .tradePrice(trade.getTradePrice())
                        .tradeQuantity(trade.getTradeQuantity())
                        .tradeStatus(trade.getTradeStatus())
                        .build();

                buyNot.add(tradeListDto);
            }

            for (Trade trade : finish) {
                TradeListDto tradeListDto = TradeListDto.builder()
                        .id(trade.getId())
                        .cropImg(trade.getCrop().getCropImgUrl())
                        .nickname(trade.getSeller().getNickname())
                        .boardTitle(trade.getBoard().getBoardTitle())
                        .tradePrice(trade.getTradePrice())
                        .tradeQuantity(trade.getTradeQuantity())
                        .tradeStatus(trade.getTradeStatus())
                        .build();

                buy.add(tradeListDto);
            }

            return TradeListReqDto.builder()
                    .FinishedList(buy)
                    .NotFinishedList(buyNot)
                    .build();

        }
    }


    @Override
    @Transactional
    public TradeResDto getTrade(int id) {
        Trade trade = tradeRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.TRADE_NOT_EXIST));

        return TradeResDto.builder()
                .board(trade.getBoard().getBoardTitle())
                .crop(trade.getCrop().getCropName())
                .tradePrice(trade.getTradePrice())
                .tradeQuantity(trade.getTradeQuantity())
                .seller(trade.getSeller().getNickname())
                .buyer(trade.getBuyer().getNickname())
                .tradeStatus(trade.getTradeStatus())
                .tradeLocation(trade.getTradeLocation())
                .tradeLocationDetail(trade.getTradeLocationDetail())
                .tradeShipment(trade.getTradeShipment())
                .tradeShipcom(trade.getTradeShipcom())
                .build();
    }

    @Override
    @Transactional
    public void updateTradeLocation(int id, TradeLocationDto tradeLocationDto) {
        // 거래 테이블 주소 업데이트
        String location = tradeLocationDto.getLocation();
        String locationDetail = tradeLocationDto.getLocationDetail();

        tradeRepository.updateLocation(id, location, locationDetail);
    }

    @Override
    @Transactional
    public TradeLocationDto updateTradeOriginalLocation(int id, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        String location = user.getAddress().getAddressLegal();
        String locationDetail = user.getAddress().getAddressDetail();

        tradeRepository.updateLocation(id, location, locationDetail);

        return TradeLocationDto.builder()
                .location(location)
                .locationDetail(locationDetail)
                .build();
    }

    @Override
    @Transactional
    public void updateTradeDeposit(int id, String depositName) {
        Trade trade = tradeRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.TRADE_NOT_EXIST));

        // 입금 테이블 생성
        TradeDeposit tradeDeposit = TradeDeposit.builder()
                .depositPrice(trade.getTradePrice())
                .depositName(depositName)
                .buyer(trade.getBuyer())
                .trade(trade)
                .build();

        // 입금 테이블 저장
        tradeDepositRepository.save(tradeDeposit);
        // 거래 테이블 상태 업데이트
        tradeRepository.updateStatus(id, 1);
        // 블록체인 민팅(입금한 만큼)
        try {
            tradeContractService.adminMint(trade.getBuyer().getWallet().getWalletAddress(), BigInteger.valueOf(trade.getTradePrice()), BigInteger.valueOf(trade.getBuyer().getId()));

        } catch (Exception e) {
            throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
        }

    }

    @Override
    @Transactional
    public void updateTradeDeal(int id, TradeShipDto tradeShipDto) {
        String tradeShipcom = tradeShipDto.getTradeShipcom();
        String tradeShipment = tradeShipDto.getTradeShipment();

        // 거래 테이블 송장번호, 택배사 업데이트
        tradeRepository.updateShip(id, tradeShipment, tradeShipcom);
        // 거래 테이블 상태 업데이트
        tradeRepository.updateStatus(id, 2);
    }

    @Override
    @Transactional
    public void updateTradeFinish(int id) {
        Trade trade = tradeRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.TRADE_NOT_EXIST));
        User seller = userRepository.findById(trade.getSeller().getId()).orElseThrow(() -> new CustomException((ExceptionType.USER_LOGIN_REQUIRED)));

        // 출금 테이블 생성
        TradeWithdrawal tradeWithdrawal = TradeWithdrawal.builder()
                .trade(trade)
                .seller(trade.getSeller())
                .withdrawalPrice(trade.getTradePrice())
                .withdrawalHolder(seller.getAccount().getDepositor())
                .withdrawalAccount(seller.getAccount().getAccountNumber())
                .withdrawalBank(seller.getAccount().getBankName())
                .withdrawalName(seller.getAccount().getDepositor())
                .build();

        // 새로 업데이트 될 잔액
        int sellerBalance = trade.getSeller().getAccount().getAccountBalance() + trade.getTradePrice();

        // 잔액 업데이트
        userRepository.updateAccount(trade.getSeller().getId(), sellerBalance);
        // 출금 테이블 저장
        tradeWithdrawalRepository.save(tradeWithdrawal);
        // 거래 테이블 상태 업데이트
        tradeRepository.updateStatus(id, 3);
        // 블록체인 토큰 구매자한테서 판매자한테로 이동
        try {
            tradeContractService.adminTransfer(trade.getSeller().getWallet().getWalletAddress(), trade.getBuyer().getWallet().getWalletAddress(), BigInteger.valueOf(trade.getTradePrice()), BigInteger.valueOf(trade.getBuyer().getId()), BigInteger.valueOf(trade.getSeller().getId()));
        } catch (Exception e) {
            throw new CustomException(ExceptionType.BLOCKCHAIN_FAILED_TO_CREATE);
        }

        //나중에 환금하는거 생기면 민팅한거 소각하고 현금 주는 로직 추가 필수
    }

    @Override
    public void deleteTrade(int id) {
        Trade trade = tradeRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.TRADE_NOT_EXIST));

        if (trade.getTradeStatus() != 0) {
            throw new CustomException(ExceptionType.STATUS_NOT_MATCH);
        } else {
            tradeRepository.deleteById(id);
        }


    }


}
