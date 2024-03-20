package com.ssafy.farmyo.blockchain.service;

import com.ssafy.farmyo.blockchain.contract.CropContract;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.math.BigInteger;
import java.util.List;


@Service
public class CropContractService {

    private final CropContract cropContract;
    private final Web3j web3j;

    public CropContractService() {

        String rpcUrl = "https://rpc2.sepolia.org";
        String privateKey = "a9e335a9f555e22b10d827b09583725038c3b48e72bc4530289cd72090f4711c";
        String contractAddress = "0x06BB5EF9f30263d2537f545E28Dfd12f90ad57Ea";


        this.web3j = Web3j.build(new HttpService(rpcUrl)); // url과 web3j을 통해 해당 코인네트워크 접속
        Credentials credentials = Credentials.create(privateKey); // 개인 키

        BigInteger gasPrice = BigInteger.valueOf(20_000_000_000L);
        BigInteger gasLimit = BigInteger.valueOf(4_300_000);

        ContractGasProvider gasProvider = new StaticGasProvider(gasPrice, gasLimit);

        this.cropContract = CropContract.load(contractAddress, web3j, credentials, gasProvider);
    }

    public void addBasicInfo(BigInteger cropPK, String cropName, String land, BigInteger createdAt) throws Exception {
        cropContract.addBasicInfo(cropPK, cropName, land, createdAt).send();
    }

    public void addUsageInfo(BigInteger cropPK, String drugName, String drugKind, BigInteger createdAt) throws Exception {
        cropContract.addUsageInfo(cropPK, drugName, drugKind, createdAt).send();
    }

    public void addContestInfo(BigInteger cropPK, String contestName, String win, BigInteger createdAt) throws Exception {
        cropContract.addContestInfo(cropPK, contestName, win, createdAt).send();
    }

    public CropContract.BasicInfo getBasicInfo(BigInteger cropPK) throws Exception {
        return cropContract.getBasicInfo(cropPK).send();
    }

    public List<CropContract.UsageInfo> getUsageInfos(BigInteger cropPK) throws Exception {
        return cropContract.getUsageInfos(cropPK).send();
    }

    public List<CropContract.ContestInfo> getContestInfos(BigInteger cropPK) throws Exception {
        return cropContract.getContestInfos(cropPK).send();
    }
}
