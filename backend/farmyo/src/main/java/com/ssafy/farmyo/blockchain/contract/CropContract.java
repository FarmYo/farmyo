package com.ssafy.farmyo.blockchain.contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.DynamicStruct;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.5.2.
 */
@SuppressWarnings("rawtypes")
public class CropContract extends Contract {
    public static final String BINARY = "608060405234801561000f575f80fd5b503360035f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611abb8061005d5f395ff3fe608060405234801561000f575f80fd5b506004361061009b575f3560e01c80637db6a118116100645780637db6a1181461016a5780638da5cb5b1461019d578063defeb3f1146101bb578063e1a0980f146101ee578063ff9825511461021e5761009b565b80621160491461009f5780631ee93ebb146100bb57806336227c46146100eb578063512894be146101075780635baa423e1461013a575b5f80fd5b6100b960048036038101906100b491906110dd565b61023a565b005b6100d560048036038101906100d09190611179565b610381565b6040516100e2919061136a565b60405180910390f35b610105600480360381019061010091906110dd565b610533565b005b610121600480360381019061011c9190611179565b6106a8565b60405161013194939291906113f0565b60405180910390f35b610154600480360381019061014f9190611179565b6107eb565b60405161016191906114a8565b60405180910390f35b610184600480360381019061017f91906114c8565b61095a565b60405161019494939291906113f0565b60405180910390f35b6101a5610ab8565b6040516101b29190611545565b60405180910390f35b6101d560048036038101906101d091906114c8565b610add565b6040516101e594939291906113f0565b60405180910390f35b61020860048036038101906102039190611179565b610c3b565b6040516102159190611680565b60405180910390f35b610238600480360381019061023391906110dd565b610ded565b005b60035f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c090611710565b60405180910390fd5b60025f8581526020019081526020015f206040518060800160405280600260ff16815260200185815260200184815260200183815250908060018154018082558091505060019003905f5260205f2090600402015f909190919091505f820151815f015f6101000a81548160ff021916908360ff16021790555060208201518160010190816103589190611928565b50604082015181600201908161036e9190611928565b5060608201518160030155505050505050565b606060015f8381526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b82821015610528578382905f5260205f2090600402016040518060800160405290815f82015f9054906101000a900460ff1660ff1660ff1681526020016001820180546103ff9061175b565b80601f016020809104026020016040519081016040528092919081815260200182805461042b9061175b565b80156104765780601f1061044d57610100808354040283529160200191610476565b820191905f5260205f20905b81548152906001019060200180831161045957829003601f168201915b5050505050815260200160028201805461048f9061175b565b80601f01602080910402602001604051908101604052809291908181526020018280546104bb9061175b565b80156105065780601f106104dd57610100808354040283529160200191610506565b820191905f5260205f20905b8154815290600101906020018083116104e957829003601f168201915b50505050508152602001600382015481525050815260200190600101906103b3565b505050509050919050565b60035f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b990611710565b60405180910390fd5b5f805f8681526020019081526020015f206003015414610617576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060e90611a67565b60405180910390fd5b60405180608001604052805f60ff168152602001848152602001838152602001828152505f808681526020019081526020015f205f820151815f015f6101000a81548160ff021916908360ff160217905550602082015181600101908161067e9190611928565b5060408201518160020190816106949190611928565b506060820151816003015590505050505050565b5f602052805f5260405f205f91509050805f015f9054906101000a900460ff16908060010180546106d89061175b565b80601f01602080910402602001604051908101604052809291908181526020018280546107049061175b565b801561074f5780601f106107265761010080835404028352916020019161074f565b820191905f5260205f20905b81548152906001019060200180831161073257829003601f168201915b5050505050908060020180546107649061175b565b80601f01602080910402602001604051908101604052809291908181526020018280546107909061175b565b80156107db5780601f106107b2576101008083540402835291602001916107db565b820191905f5260205f20905b8154815290600101906020018083116107be57829003601f168201915b5050505050908060030154905084565b6107f3610f34565b5f808381526020019081526020015f206040518060800160405290815f82015f9054906101000a900460ff1660ff1660ff1681526020016001820180546108399061175b565b80601f01602080910402602001604051908101604052809291908181526020018280546108659061175b565b80156108b05780601f10610887576101008083540402835291602001916108b0565b820191905f5260205f20905b81548152906001019060200180831161089357829003601f168201915b505050505081526020016002820180546108c99061175b565b80601f01602080910402602001604051908101604052809291908181526020018280546108f59061175b565b80156109405780601f1061091757610100808354040283529160200191610940565b820191905f5260205f20905b81548152906001019060200180831161092357829003601f168201915b505050505081526020016003820154815250509050919050565b6001602052815f5260405f208181548110610973575f80fd5b905f5260205f2090600402015f9150915050805f015f9054906101000a900460ff16908060010180546109a59061175b565b80601f01602080910402602001604051908101604052809291908181526020018280546109d19061175b565b8015610a1c5780601f106109f357610100808354040283529160200191610a1c565b820191905f5260205f20905b8154815290600101906020018083116109ff57829003601f168201915b505050505090806002018054610a319061175b565b80601f0160208091040260200160405190810160405280929190818152602001828054610a5d9061175b565b8015610aa85780601f10610a7f57610100808354040283529160200191610aa8565b820191905f5260205f20905b815481529060010190602001808311610a8b57829003601f168201915b5050505050908060030154905084565b60035f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6002602052815f5260405f208181548110610af6575f80fd5b905f5260205f2090600402015f9150915050805f015f9054906101000a900460ff1690806001018054610b289061175b565b80601f0160208091040260200160405190810160405280929190818152602001828054610b549061175b565b8015610b9f5780601f10610b7657610100808354040283529160200191610b9f565b820191905f5260205f20905b815481529060010190602001808311610b8257829003601f168201915b505050505090806002018054610bb49061175b565b80601f0160208091040260200160405190810160405280929190818152602001828054610be09061175b565b8015610c2b5780601f10610c0257610100808354040283529160200191610c2b565b820191905f5260205f20905b815481529060010190602001808311610c0e57829003601f168201915b5050505050908060030154905084565b606060025f8381526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b82821015610de2578382905f5260205f2090600402016040518060800160405290815f82015f9054906101000a900460ff1660ff1660ff168152602001600182018054610cb99061175b565b80601f0160208091040260200160405190810160405280929190818152602001828054610ce59061175b565b8015610d305780601f10610d0757610100808354040283529160200191610d30565b820191905f5260205f20905b815481529060010190602001808311610d1357829003601f168201915b50505050508152602001600282018054610d499061175b565b80601f0160208091040260200160405190810160405280929190818152602001828054610d759061175b565b8015610dc05780601f10610d9757610100808354040283529160200191610dc0565b820191905f5260205f20905b815481529060010190602001808311610da357829003601f168201915b5050505050815260200160038201548152505081526020019060010190610c6d565b505050509050919050565b60035f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7390611710565b60405180910390fd5b60015f8581526020019081526020015f206040518060800160405280600160ff16815260200185815260200184815260200183815250908060018154018082558091505060019003905f5260205f2090600402015f909190919091505f820151815f015f6101000a81548160ff021916908360ff1602179055506020820151816001019081610f0b9190611928565b506040820151816002019081610f219190611928565b5060608201518160030155505050505050565b60405180608001604052805f60ff16815260200160608152602001606081526020015f81525090565b5f604051905090565b5f80fd5b5f80fd5b5f819050919050565b610f8081610f6e565b8114610f8a575f80fd5b50565b5f81359050610f9b81610f77565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610fef82610fa9565b810181811067ffffffffffffffff8211171561100e5761100d610fb9565b5b80604052505050565b5f611020610f5d565b905061102c8282610fe6565b919050565b5f67ffffffffffffffff82111561104b5761104a610fb9565b5b61105482610fa9565b9050602081019050919050565b828183375f83830152505050565b5f61108161107c84611031565b611017565b90508281526020810184848401111561109d5761109c610fa5565b5b6110a8848285611061565b509392505050565b5f82601f8301126110c4576110c3610fa1565b5b81356110d484826020860161106f565b91505092915050565b5f805f80608085870312156110f5576110f4610f66565b5b5f61110287828801610f8d565b945050602085013567ffffffffffffffff81111561112357611122610f6a565b5b61112f878288016110b0565b935050604085013567ffffffffffffffff8111156111505761114f610f6a565b5b61115c878288016110b0565b925050606061116d87828801610f8d565b91505092959194509250565b5f6020828403121561118e5761118d610f66565b5b5f61119b84828501610f8d565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f60ff82169050919050565b6111e2816111cd565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561121f578082015181840152602081019050611204565b5f8484015250505050565b5f611234826111e8565b61123e81856111f2565b935061124e818560208601611202565b61125781610fa9565b840191505092915050565b61126b81610f6e565b82525050565b5f608083015f8301516112865f8601826111d9565b506020830151848203602086015261129e828261122a565b915050604083015184820360408601526112b8828261122a565b91505060608301516112cd6060860182611262565b508091505092915050565b5f6112e38383611271565b905092915050565b5f602082019050919050565b5f611301826111a4565b61130b81856111ae565b93508360208202850161131d856111be565b805f5b85811015611358578484038952815161133985826112d8565b9450611344836112eb565b925060208a01995050600181019050611320565b50829750879550505050505092915050565b5f6020820190508181035f83015261138281846112f7565b905092915050565b611393816111cd565b82525050565b5f82825260208201905092915050565b5f6113b3826111e8565b6113bd8185611399565b93506113cd818560208601611202565b6113d681610fa9565b840191505092915050565b6113ea81610f6e565b82525050565b5f6080820190506114035f83018761138a565b818103602083015261141581866113a9565b9050818103604083015261142981856113a9565b905061143860608301846113e1565b95945050505050565b5f608083015f8301516114565f8601826111d9565b506020830151848203602086015261146e828261122a565b91505060408301518482036040860152611488828261122a565b915050606083015161149d6060860182611262565b508091505092915050565b5f6020820190508181035f8301526114c08184611441565b905092915050565b5f80604083850312156114de576114dd610f66565b5b5f6114eb85828601610f8d565b92505060206114fc85828601610f8d565b9150509250929050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61152f82611506565b9050919050565b61153f81611525565b82525050565b5f6020820190506115585f830184611536565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f608083015f83015161159c5f8601826111d9565b50602083015184820360208601526115b4828261122a565b915050604083015184820360408601526115ce828261122a565b91505060608301516115e36060860182611262565b508091505092915050565b5f6115f98383611587565b905092915050565b5f602082019050919050565b5f6116178261155e565b6116218185611568565b93508360208202850161163385611578565b805f5b8581101561166e578484038952815161164f85826115ee565b945061165a83611601565b925060208a01995050600181019050611636565b50829750879550505050505092915050565b5f6020820190508181035f830152611698818461160d565b905092915050565b7f546869732066756e6374696f6e2063616e2062652063616c6c656420627920745f8201527f6865206f776e6572206f6e6c792e000000000000000000000000000000000000602082015250565b5f6116fa602e83611399565b9150611705826116a0565b604082019050919050565b5f6020820190508181035f830152611727816116ee565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061177257607f821691505b6020821081036117855761178461172e565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026117e77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826117ac565b6117f186836117ac565b95508019841693508086168417925050509392505050565b5f819050919050565b5f61182c61182761182284610f6e565b611809565b610f6e565b9050919050565b5f819050919050565b61184583611812565b61185961185182611833565b8484546117b8565b825550505050565b5f90565b61186d611861565b61187881848461183c565b505050565b5b8181101561189b576118905f82611865565b60018101905061187e565b5050565b601f8211156118e0576118b18161178b565b6118ba8461179d565b810160208510156118c9578190505b6118dd6118d58561179d565b83018261187d565b50505b505050565b5f82821c905092915050565b5f6119005f19846008026118e5565b1980831691505092915050565b5f61191883836118f1565b9150826002028217905092915050565b611931826111e8565b67ffffffffffffffff81111561194a57611949610fb9565b5b611954825461175b565b61195f82828561189f565b5f60209050601f831160018114611990575f841561197e578287015190505b611988858261190d565b8655506119ef565b601f19841661199e8661178b565b5f5b828110156119c5578489015182556001820191506020850194506020810190506119a0565b868310156119e257848901516119de601f8916826118f1565b8355505b6001600288020188555050505b505050505050565b7f4261736963496e666f20616c72656164792065786973747320666f72207468695f8201527f7320504b2e000000000000000000000000000000000000000000000000000000602082015250565b5f611a51602583611399565b9150611a5c826119f7565b604082019050919050565b5f6020820190508181035f830152611a7e81611a45565b905091905056fea264697066735822122076686ac5b32c359ce905b8eb043df5ff1efd8f1fa55454bc9a7205255269ba5f64736f6c63430008180033";

    public static final String FUNC_ADDBASICINFO = "addBasicInfo";

    public static final String FUNC_ADDCONTESTINFO = "addContestInfo";

    public static final String FUNC_ADDUSAGEINFO = "addUsageInfo";

    public static final String FUNC_BASICINFOS = "basicInfos";

    public static final String FUNC_CONTESTINFOS = "contestInfos";

    public static final String FUNC_GETBASICINFO = "getBasicInfo";

    public static final String FUNC_GETCONTESTINFOS = "getContestInfos";

    public static final String FUNC_GETUSAGEINFOS = "getUsageInfos";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_USAGEINFOS = "usageInfos";

    @Deprecated
    protected CropContract(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected CropContract(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected CropContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected CropContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> addBasicInfo(BigInteger _cropPK, String _cropName, String _land, BigInteger _createdAt) {
        final Function function = new Function(
                FUNC_ADDBASICINFO, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK), 
                new org.web3j.abi.datatypes.Utf8String(_cropName), 
                new org.web3j.abi.datatypes.Utf8String(_land), 
                new org.web3j.abi.datatypes.generated.Uint256(_createdAt)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addContestInfo(BigInteger _cropPK, String _contestName, String _win, BigInteger _createdAt) {
        final Function function = new Function(
                FUNC_ADDCONTESTINFO, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK), 
                new org.web3j.abi.datatypes.Utf8String(_contestName), 
                new org.web3j.abi.datatypes.Utf8String(_win), 
                new org.web3j.abi.datatypes.generated.Uint256(_createdAt)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addUsageInfo(BigInteger _cropPK, String _drugName, String _drugKind, BigInteger _createdAt) {
        final Function function = new Function(
                FUNC_ADDUSAGEINFO, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK), 
                new org.web3j.abi.datatypes.Utf8String(_drugName), 
                new org.web3j.abi.datatypes.Utf8String(_drugKind), 
                new org.web3j.abi.datatypes.generated.Uint256(_createdAt)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>> basicInfos(BigInteger param0) {
        final Function function = new Function(FUNC_BASICINFOS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>>(function,
                new Callable<Tuple4<BigInteger, String, String, BigInteger>>() {
                    @Override
                    public Tuple4<BigInteger, String, String, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, String, String, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>> contestInfos(BigInteger param0, BigInteger param1) {
        final Function function = new Function(FUNC_CONTESTINFOS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0), 
                new org.web3j.abi.datatypes.generated.Uint256(param1)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>>(function,
                new Callable<Tuple4<BigInteger, String, String, BigInteger>>() {
                    @Override
                    public Tuple4<BigInteger, String, String, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, String, String, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BasicInfo> getBasicInfo(BigInteger _cropPK) {
        final Function function = new Function(FUNC_GETBASICINFO, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<BasicInfo>() {}));
        return executeRemoteCallSingleValueReturn(function, BasicInfo.class);
    }

    public RemoteFunctionCall<List> getContestInfos(BigInteger _cropPK) {
        final Function function = new Function(FUNC_GETCONTESTINFOS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<ContestInfo>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<List> getUsageInfos(BigInteger _cropPK) {
        final Function function = new Function(FUNC_GETUSAGEINFOS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<UsageInfo>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>> usageInfos(BigInteger param0, BigInteger param1) {
        final Function function = new Function(FUNC_USAGEINFOS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0), 
                new org.web3j.abi.datatypes.generated.Uint256(param1)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>>(function,
                new Callable<Tuple4<BigInteger, String, String, BigInteger>>() {
                    @Override
                    public Tuple4<BigInteger, String, String, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, String, String, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    @Deprecated
    public static CropContract load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new CropContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static CropContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new CropContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static CropContract load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new CropContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static CropContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new CropContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<CropContract> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(CropContract.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    public static RemoteCall<CropContract> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(CropContract.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<CropContract> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(CropContract.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<CropContract> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(CropContract.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class BasicInfo extends DynamicStruct {
        public BigInteger infoType;

        public String cropName;

        public String land;

        public BigInteger createdAt;

        public BasicInfo(BigInteger infoType, String cropName, String land, BigInteger createdAt) {
            super(new org.web3j.abi.datatypes.generated.Uint8(infoType), 
                    new org.web3j.abi.datatypes.Utf8String(cropName), 
                    new org.web3j.abi.datatypes.Utf8String(land), 
                    new org.web3j.abi.datatypes.generated.Uint256(createdAt));
            this.infoType = infoType;
            this.cropName = cropName;
            this.land = land;
            this.createdAt = createdAt;
        }

        public BasicInfo(Uint8 infoType, Utf8String cropName, Utf8String land, Uint256 createdAt) {
            super(infoType, cropName, land, createdAt);
            this.infoType = infoType.getValue();
            this.cropName = cropName.getValue();
            this.land = land.getValue();
            this.createdAt = createdAt.getValue();
        }
    }

    public static class ContestInfo extends DynamicStruct {
        public BigInteger infoType;

        public String contestName;

        public String win;

        public BigInteger createdAt;

        public ContestInfo(BigInteger infoType, String contestName, String win, BigInteger createdAt) {
            super(new org.web3j.abi.datatypes.generated.Uint8(infoType), 
                    new org.web3j.abi.datatypes.Utf8String(contestName), 
                    new org.web3j.abi.datatypes.Utf8String(win), 
                    new org.web3j.abi.datatypes.generated.Uint256(createdAt));
            this.infoType = infoType;
            this.contestName = contestName;
            this.win = win;
            this.createdAt = createdAt;
        }

        public ContestInfo(Uint8 infoType, Utf8String contestName, Utf8String win, Uint256 createdAt) {
            super(infoType, contestName, win, createdAt);
            this.infoType = infoType.getValue();
            this.contestName = contestName.getValue();
            this.win = win.getValue();
            this.createdAt = createdAt.getValue();
        }
    }

    public static class UsageInfo extends DynamicStruct {
        public BigInteger infoType;

        public String drugName;

        public String drugKind;

        public BigInteger createdAt;

        public UsageInfo(BigInteger infoType, String drugName, String drugKind, BigInteger createdAt) {
            super(new org.web3j.abi.datatypes.generated.Uint8(infoType), 
                    new org.web3j.abi.datatypes.Utf8String(drugName), 
                    new org.web3j.abi.datatypes.Utf8String(drugKind), 
                    new org.web3j.abi.datatypes.generated.Uint256(createdAt));
            this.infoType = infoType;
            this.drugName = drugName;
            this.drugKind = drugKind;
            this.createdAt = createdAt;
        }

        public UsageInfo(Uint8 infoType, Utf8String drugName, Utf8String drugKind, Uint256 createdAt) {
            super(infoType, drugName, drugKind, createdAt);
            this.infoType = infoType.getValue();
            this.drugName = drugName.getValue();
            this.drugKind = drugKind.getValue();
            this.createdAt = createdAt.getValue();
        }
    }
}
