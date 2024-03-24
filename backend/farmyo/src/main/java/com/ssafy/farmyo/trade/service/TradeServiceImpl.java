package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.*;
import com.ssafy.farmyo.trade.dto.TradeListReqDto;
import com.ssafy.farmyo.trade.dto.TradeReqDto;
import com.ssafy.farmyo.trade.dto.TradeResDto;
import com.ssafy.farmyo.trade.repository.TradeDepositRepository;
import com.ssafy.farmyo.trade.repository.TradeRepository;
import com.ssafy.farmyo.trade.repository.TradeWithdrawalRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public void createTrade(TradeReqDto tradeReqDto) {

        // seller 가져오기
        User seller = userRepository.findByLoginId(tradeReqDto.getSellerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        // buyer 가져오기
        User buyer = userRepository.findByLoginId(tradeReqDto.getBuyerId()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        // boardId 가져오기
        Board board = boardRepository.findById(tradeReqDto.getBoardId()).orElseThrow(() -> new CustomException(ExceptionType.BOARD_NOT_EXIST));
        // chatId 가져오기
        Chat chat = chatRepository.findById(tradeReqDto.getChatId()).orElseThrow(() -> new CustomException(ExceptionType.CHAT_NOT_EXIST));
        // cropId 가져오기
        Crop crop = cropRepository.findById(tradeReqDto.getCropId()).orElseThrow(() -> new CustomException(ExceptionType.CROP_NOT_EXIST));

        // trade 생성
        Trade trade = Trade.builder()
                .tradePrice(tradeReqDto.getTradePrice())
                .tradeQuantity(tradeReqDto.getTradeQuantity())
                .buyer(buyer)
                .seller(seller)
                .chat(chat)
                .crop(crop)
                .board(board)
                .build();

        // trade 저장
        tradeRepository.save(trade);
        log.info("{} : (service)거래 생성 완료", trade);
    }


    @Override
    public TradeListReqDto getTrades(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        TradeListReqDto tradeListReqDto = new TradeListReqDto();

        // user가 판매자인지 구매자인지 확인
        int job = user.getJob();

        if (job == 0) { // user가 판매자라면
            // 진행중인 거래와 완료된 거래를 각각 tradeListReqDto에 넣음
            tradeListReqDto.setNotFinishedList(tradeRepository.getSellerTradeListNotFinished(userId));
            tradeListReqDto.setFinishedList(tradeRepository.getSellerTradeListFinished(userId));
        } else { // user가 구매자라면
            // 진행중인 거래와 완료된 거래를 각각 tradeListReqDto에 넣음
            tradeListReqDto.setNotFinishedList(tradeRepository.getBuyerTradeListNotFinished(userId));
            tradeListReqDto.setFinishedList(tradeRepository.getBuyerTradeListFinished(userId));

        }

        return tradeListReqDto;
    }

    @Override
    public TradeResDto getTrade(int id) {
        Trade trade = tradeRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.TRADE_NOT_EXIST));

        TradeResDto tradeResDto = new TradeResDto();

        // seller, buyer, crop, board id로 string값 받아오기
        tradeResDto.setSeller(trade.getSeller().getNickname());
        tradeResDto.setBuyer(trade.getBuyer().getNickname());
        tradeResDto.setCrop(trade.getCrop().getCropName());
        tradeResDto.setBoard(trade.getBoard().getBoardTitle());

        // trade entity에서 나머지 정보 받아오기
        tradeResDto.setId(trade.getId());
        tradeResDto.setTradePrice(trade.getTradePrice());
        tradeResDto.setTradeQuantity(trade.getTradeQuantity());
        tradeResDto.setChatId(trade.getChat().getId());
        tradeResDto.setTradeStatus(trade.getTradeStatus());
        tradeResDto.setTradeShipcom(trade.getTradeShipcom());
        tradeResDto.setTradeShipment(trade.getTradeShipment());
        tradeResDto.setTradeLocation(trade.getTradeLocation());
        tradeResDto.setTradeBlockchain(trade.getTradeBlockchain());

        return tradeResDto;
    }

    @Override
    public void updateTradeLocation(int id, String location) {
        // 거래 테이블 주소 업데이트
        tradeRepository.updateLocation(id, location);
    }

    @Override
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
    }

    @Override
    public void updateTradeDeal(int id, String tradeShipment, String tradeShipcom) {
        // 거래 테이블 송장번호, 택배사 업데이트
        tradeRepository.updateShip(id, tradeShipment, tradeShipcom);
        // 거래 테이블 상태 업데이트
        tradeRepository.updateStatus(id, 2);
    }

    @Override
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

        // 출금 테이블 저장
        tradeWithdrawalRepository.save(tradeWithdrawal);
        // 거래 테이블 상태 업데이트
        tradeRepository.updateStatus(id, 3);
    }


}
