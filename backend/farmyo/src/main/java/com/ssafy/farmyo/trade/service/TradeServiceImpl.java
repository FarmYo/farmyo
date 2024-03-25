package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.*;
import com.ssafy.farmyo.trade.dto.TradeListDto;
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

        if (job == 0) { // user가 판매자라면
            List<TradeListDto> finish = tradeRepository.getSellerListFinish(id);
            List<TradeListDto> notFinish = tradeRepository.getSellerListNotFinish(id);

            return TradeListReqDto.builder()
                    .FinishedList(finish)
                    .NotFinishedList(notFinish)
                    .build();
        } else { // user가 구매자라면
            List<TradeListDto> finish = tradeRepository.getBuyerListFinish(id);
            List<TradeListDto> notFinish = tradeRepository.getBuyerListNotFinish(id);

            return TradeListReqDto.builder()
                    .FinishedList(finish)
                    .NotFinishedList(notFinish)
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
                .tradeShipment(trade.getTradeShipment())
                .tradeShipcom(trade.getTradeShipcom())
                .build();
    }

    @Override
    @Transactional
    public void updateTradeLocation(int id, String location) {
        // 거래 테이블 주소 업데이트
        tradeRepository.updateLocation(id, location);
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
    }

    @Override
    @Transactional
    public void updateTradeDeal(int id, String tradeShipment, String tradeShipcom) {
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

        // 출금 테이블 저장
        tradeWithdrawalRepository.save(tradeWithdrawal);
        // 거래 테이블 상태 업데이트
        tradeRepository.updateStatus(id, 3);
    }


}
