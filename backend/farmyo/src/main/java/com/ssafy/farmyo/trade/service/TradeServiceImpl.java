package com.ssafy.farmyo.trade.service;

import com.ssafy.farmyo.board.repository.BoardRepository;
import com.ssafy.farmyo.chat.repository.ChatRepository;
import com.ssafy.farmyo.crop.repository.CropRepository;
import com.ssafy.farmyo.entity.*;
import com.ssafy.farmyo.trade.dto.TradeDto;
import com.ssafy.farmyo.trade.dto.TradeReqDto;
import com.ssafy.farmyo.trade.dto.TradeResDto;
import com.ssafy.farmyo.trade.repository.TradeRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TradeServiceImpl implements TradeService {

    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ChatRepository chatRepository;
    private final CropRepository cropRepository;

    @Override
    public void createTrade(TradeReqDto tradeReqDto) {

        // seller 가져오기
        User seller = userRepository.findById(tradeReqDto.getSeller());
        // buyer 가져오기
        User buyer = userRepository.findById(tradeReqDto.getBuyer());
        // boardId 가져오기
        Board boardId = boardRepository.findById(tradeReqDto.getBoard());
        // chatId 가져오기
        Chat chatId = chatRepository.findById(tradeReqDto.getChat());
        // cropId 가져오기
        Crop cropId = cropRepository.findById(tradeReqDto.getCrop());

        // trade 생성
        Trade trade = Trade.builder()
                .tradePrice(tradeReqDto.getTradePrice())
                .tradeQuantity(tradeReqDto.getTradeQuantity())
                .buyer(buyer)
                .seller(seller)
                .chat(chatId)
                .crop(cropId)
                .board(boardId)
                .build();

        // trade 저장
        tradeRepository.save(trade);
    }


    @Override
    public Map<String, Object> getTrades(int userId) {
        Map<String, Object> resultMap = new HashMap<>();
        User user = userRepository.findById(userId);

        // user가 판매자인지 구매자인지 확인
        int job = user.getJob();

        if (job == 0) { // user가 판매자라면
            // 진행중인 거래와 완료된 거래를 각각 resultMap에 넣음
            resultMap.put("진행중인 거래", tradeRepository.getSellerTradeListNotFinished(userId, 3));
            resultMap.put("완료된 거래", tradeRepository.getSellerTradeListFinished(userId, 3));
        } else { // user가 구매자라면
            // 진행중인 거래와 완료된 거래를 각각 resultMap에 넣음
            resultMap.put("진행중인 거래", tradeRepository.getBuyerTradeListNotFinished(userId, 3));
            resultMap.put("완료된 거래", tradeRepository.getBuyerTradeListFinished(userId, 3));

        }

        return resultMap;
    }

    @Override
    public TradeResDto getTrade(int id) {
        Trade trade = tradeRepository.findById(id);

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
    public void updateTrade(TradeDto tradeDto) {

    }



}
