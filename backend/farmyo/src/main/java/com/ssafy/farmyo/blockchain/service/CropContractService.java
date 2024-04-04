package com.ssafy.farmyo.blockchain.service;

import com.ssafy.farmyo.blockchain.contract.CropContract;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;

import java.io.IOException;
import java.math.BigInteger;

@Service
@RequiredArgsConstructor
public class CropContractService {

    private CropContract cropContract;
    private Web3j web3j;

    private Credentials credentials;

    private TransactionManager transactionManager;

    @Value("${spring.blockChain.privateKey}")
    private String privateKey;

    @PostConstruct
    public void init() throws IOException {
        String rpcUrl = "https://rpc2.sepolia.org";
        String contractAddress = "0xE8448EEB2629E3e96f96f8EBedc9Fd2faa6fe20c";
        long chainId = 11155111;

        this.web3j = Web3j.build(new HttpService(rpcUrl)); // url과 web3j을 통해 해당 코인네트워크 접속
        this.credentials = Credentials.create(privateKey); // 개인 키

        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice();
        BigInteger higherGasPrice = gasPrice.multiply(BigInteger.valueOf(5));

        TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(
                web3j,
                TransactionManager.DEFAULT_POLLING_FREQUENCY,
                TransactionManager.DEFAULT_POLLING_ATTEMPTS_PER_TX_HASH
        );

        this.transactionManager = new RawTransactionManager(
                web3j,
                credentials,
                chainId,
                receiptProcessor
        );

        // CropData 스마트 계약 로드, ContractGasProvider를 사용하여 가스 가격 및 한도 설정
        this.cropContract = CropContract.load(
                contractAddress,
                web3j,
                transactionManager,
                new ContractGasProvider() {
                    @Override
                    public BigInteger getGasPrice(String contractFunc) {
                        return higherGasPrice; // 동적으로 조회된 가스 가격 사용
                    }

                    @Override
                    public BigInteger getGasPrice() {
                        return higherGasPrice; // 동적으로 조회된 가스 가격 사용
                    }

                    @Override
                    public BigInteger getGasLimit(String contractFunc) {
                        return BigInteger.valueOf(10000000); // 예제 가스 한도
                    }

                    @Override
                    public BigInteger getGasLimit() {
                        return BigInteger.valueOf(10000000); // 예제 가스 한도
                    }
                }
        );
    }

    public TransactionReceipt addPlantingInfo(BigInteger cropPK, String cropName, String land, BigInteger eventDate) throws Exception {
        return cropContract.addPlantingInfo(cropPK, cropName, land, eventDate).send();
    }

    public TransactionReceipt addUsageInfo(BigInteger cropPK, String pesticideName, String pesticideType, BigInteger eventDate) throws Exception {
        return cropContract.addUsageInfo(cropPK, pesticideName, pesticideType, eventDate).send();
    }

    public TransactionReceipt addContestInfo(BigInteger cropPK, String contestName, String awardDetails, BigInteger eventDate) throws Exception {
        return cropContract.addContestInfo(cropPK, contestName, awardDetails, eventDate).send();
    }

    public TransactionReceipt addHarvestInfo(BigInteger cropPK, BigInteger eventDate) throws Exception {
        return cropContract.addHarvestInfo(cropPK, eventDate).send();
    }
}
