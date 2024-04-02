package com.ssafy.farmyo.blockchain.contract;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
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
public class TradeContract extends Contract {
    public static final String BINARY = "608060405234801562000010575f80fd5b5060405162001af338038062001af383398181016040528101906200003691906200027d565b806040518060400160405280600781526020017f4d79546f6b656e000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4d544b00000000000000000000000000000000000000000000000000000000008152508160039081620000b4919062000511565b508060049081620000c6919062000511565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200013c575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040162000133919062000606565b60405180910390fd5b6200014d816200015560201b60201c565b505062000621565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f62000247826200021c565b9050919050565b62000259816200023b565b811462000264575f80fd5b50565b5f8151905062000277816200024e565b92915050565b5f6020828403121562000295576200029462000218565b5b5f620002a48482850162000267565b91505092915050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806200032957607f821691505b6020821081036200033f576200033e620002e4565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620003a37fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000366565b620003af868362000366565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f620003f9620003f3620003ed84620003c7565b620003d0565b620003c7565b9050919050565b5f819050919050565b6200041483620003d9565b6200042c620004238262000400565b84845462000372565b825550505050565b5f90565b6200044262000434565b6200044f81848462000409565b505050565b5b8181101562000476576200046a5f8262000438565b60018101905062000455565b5050565b601f821115620004c5576200048f8162000345565b6200049a8462000357565b81016020851015620004aa578190505b620004c2620004b98562000357565b83018262000454565b50505b505050565b5f82821c905092915050565b5f620004e75f1984600802620004ca565b1980831691505092915050565b5f620005018383620004d6565b9150826002028217905092915050565b6200051c82620002ad565b67ffffffffffffffff811115620005385762000537620002b7565b5b62000544825462000311565b620005518282856200047a565b5f60209050601f83116001811462000587575f841562000572578287015190505b6200057e8582620004f4565b865550620005ed565b601f198416620005978662000345565b5f5b82811015620005c05784890151825560018201915060208501945060208101905062000599565b86831015620005e05784890151620005dc601f891682620004d6565b8355505b6001600288020188555050505b505050505050565b62000600816200023b565b82525050565b5f6020820190506200061b5f830184620005f5565b92915050565b6114c4806200062f5f395ff3fe608060405234801561000f575f80fd5b5060043610610108575f3560e01c806342966c68116100a05780638da5cb5b1161006f5780638da5cb5b1461028c57806395d89b41146102aa578063a9059cbb146102c8578063dd62ed3e146102f8578063f2fde38b1461032857610108565b806342966c681461021a57806370a0823114610236578063715018a61461026657806379cc67901461027057610108565b80631b56a5be116100dc5780631b56a5be1461019457806323b872dd146101b057806327052b11146101e0578063313ce567146101fc57610108565b80624a84cb1461010c57806306fdde0314610128578063095ea7b31461014657806318160ddd14610176575b5f80fd5b61012660048036038101906101219190610ff6565b610344565b005b610130610395565b60405161013d91906110d0565b60405180910390f35b610160600480360381019061015b91906110f0565b610425565b60405161016d9190611148565b60405180910390f35b61017e610447565b60405161018b9190611170565b60405180910390f35b6101ae60048036038101906101a99190610ff6565b610450565b005b6101ca60048036038101906101c59190611189565b6104a1565b6040516101d79190611148565b60405180910390f35b6101fa60048036038101906101f591906111d9565b6104cf565b005b610204610526565b604051610211919061126b565b60405180910390f35b610234600480360381019061022f9190611284565b61052e565b005b610250600480360381019061024b91906112af565b610542565b60405161025d9190611170565b60405180910390f35b61026e610587565b005b61028a600480360381019061028591906110f0565b61059a565b005b6102946105ba565b6040516102a191906112e9565b60405180910390f35b6102b26105e2565b6040516102bf91906110d0565b60405180910390f35b6102e260048036038101906102dd91906110f0565b610672565b6040516102ef9190611148565b60405180910390f35b610312600480360381019061030d9190611302565b610694565b60405161031f9190611170565b60405180910390f35b610342600480360381019061033d91906112af565b610716565b005b61034c61079a565b6103568383610821565b807f25b428dfde728ccfaddad7e29e4ac23c24ed7fd1a6e3e3f91894a9a073f5dfff8484604051610388929190611340565b60405180910390a2505050565b6060600380546103a490611394565b80601f01602080910402602001604051908101604052809291908181526020018280546103d090611394565b801561041b5780601f106103f25761010080835404028352916020019161041b565b820191905f5260205f20905b8154815290600101906020018083116103fe57829003601f168201915b5050505050905090565b5f8061042f6108a0565b905061043c8185856108a7565b600191505092915050565b5f600254905090565b61045861079a565b61046283836108b9565b807f23ff0e75edf108e3d0392d92e13e8c8a868ef19001bd49f9e94876dc46dff87f8484604051610494929190611340565b60405180910390a2505050565b5f806104ab6108a0565b90506104b8858285610938565b6104c38585856109ca565b60019150509392505050565b6104d761079a565b6104e28585856109ca565b80827fb84ddaa09f6e6f18885d8658d262f41beb0c0baf61d6a95e78357529bd71aaf0868887604051610517939291906113c4565b60405180910390a35050505050565b5f6012905090565b61053f6105396108a0565b826108b9565b50565b5f805f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b61058f61079a565b6105985f610aba565b565b6105ac826105a66108a0565b83610938565b6105b682826108b9565b5050565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546105f190611394565b80601f016020809104026020016040519081016040528092919081815260200182805461061d90611394565b80156106685780601f1061063f57610100808354040283529160200191610668565b820191905f5260205f20905b81548152906001019060200180831161064b57829003601f168201915b5050505050905090565b5f8061067c6108a0565b90506106898185856109ca565b600191505092915050565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b61071e61079a565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361078e575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161078591906112e9565b60405180910390fd5b61079781610aba565b50565b6107a26108a0565b73ffffffffffffffffffffffffffffffffffffffff166107c06105ba565b73ffffffffffffffffffffffffffffffffffffffff161461081f576107e36108a0565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161081691906112e9565b60405180910390fd5b565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610891575f6040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161088891906112e9565b60405180910390fd5b61089c5f8383610b7d565b5050565b5f33905090565b6108b48383836001610d96565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610929575f6040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161092091906112e9565b60405180910390fd5b610934825f83610b7d565b5050565b5f6109438484610694565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146109c457818110156109b5578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016109ac939291906113f9565b60405180910390fd5b6109c384848484035f610d96565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a3a575f6040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610a3191906112e9565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610aaa575f6040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610aa191906112e9565b60405180910390fd5b610ab5838383610b7d565b505050565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610bcd578060025f828254610bc1919061145b565b92505081905550610c9b565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610c56578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610c4d939291906113f9565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ce2578060025f8282540392505081905550610d2c565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d899190611170565b60405180910390a3505050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610e06575f6040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610dfd91906112e9565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610e76575f6040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610e6d91906112e9565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508015610f5f578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610f569190611170565b60405180910390a35b50505050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610f9282610f69565b9050919050565b610fa281610f88565b8114610fac575f80fd5b50565b5f81359050610fbd81610f99565b92915050565b5f819050919050565b610fd581610fc3565b8114610fdf575f80fd5b50565b5f81359050610ff081610fcc565b92915050565b5f805f6060848603121561100d5761100c610f65565b5b5f61101a86828701610faf565b935050602061102b86828701610fe2565b925050604061103c86828701610fe2565b9150509250925092565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561107d578082015181840152602081019050611062565b5f8484015250505050565b5f601f19601f8301169050919050565b5f6110a282611046565b6110ac8185611050565b93506110bc818560208601611060565b6110c581611088565b840191505092915050565b5f6020820190508181035f8301526110e88184611098565b905092915050565b5f806040838503121561110657611105610f65565b5b5f61111385828601610faf565b925050602061112485828601610fe2565b9150509250929050565b5f8115159050919050565b6111428161112e565b82525050565b5f60208201905061115b5f830184611139565b92915050565b61116a81610fc3565b82525050565b5f6020820190506111835f830184611161565b92915050565b5f805f606084860312156111a05761119f610f65565b5b5f6111ad86828701610faf565b93505060206111be86828701610faf565b92505060406111cf86828701610fe2565b9150509250925092565b5f805f805f60a086880312156111f2576111f1610f65565b5b5f6111ff88828901610faf565b955050602061121088828901610faf565b945050604061122188828901610fe2565b935050606061123288828901610fe2565b925050608061124388828901610fe2565b9150509295509295909350565b5f60ff82169050919050565b61126581611250565b82525050565b5f60208201905061127e5f83018461125c565b92915050565b5f6020828403121561129957611298610f65565b5b5f6112a684828501610fe2565b91505092915050565b5f602082840312156112c4576112c3610f65565b5b5f6112d184828501610faf565b91505092915050565b6112e381610f88565b82525050565b5f6020820190506112fc5f8301846112da565b92915050565b5f806040838503121561131857611317610f65565b5b5f61132585828601610faf565b925050602061133685828601610faf565b9150509250929050565b5f6040820190506113535f8301856112da565b6113606020830184611161565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806113ab57607f821691505b6020821081036113be576113bd611367565b5b50919050565b5f6060820190506113d75f8301866112da565b6113e460208301856112da565b6113f16040830184611161565b949350505050565b5f60608201905061140c5f8301866112da565b6114196020830185611161565b6114266040830184611161565b949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61146582610fc3565b915061147083610fc3565b92508282019050808211156114885761148761142e565b5b9291505056fea264697066735822122062dd70e2fb835f47a47f06a7cad4a85d0a11383b5ec7f3136450739bcb0b84be64736f6c63430008180033";

    public static final String FUNC_ADMINBURN = "adminBurn";

    public static final String FUNC_ADMINMINT = "adminMint";

    public static final String FUNC_ADMINTRANSFER = "adminTransfer";

    public static final String FUNC_ALLOWANCE = "allowance";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_BURN = "burn";

    public static final String FUNC_BURNFROM = "burnFrom";

    public static final String FUNC_DECIMALS = "decimals";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_RENOUNCEOWNERSHIP = "renounceOwnership";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_TRANSFEROWNERSHIP = "transferOwnership";

    public static final Event APPROVAL_EVENT = new Event("Approval", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event BURNED_EVENT = new Event("Burned", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>(true) {}));
    ;

    public static final Event MINTED_EVENT = new Event("Minted", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>(true) {}));
    ;

    public static final Event OWNERSHIPTRANSFERRED_EVENT = new Event("OwnershipTransferred", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}));
    ;

    public static final Event TRANSFER_EVENT = new Event("Transfer", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event TRANSFERED_EVENT = new Event("Transfered", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    @Deprecated
    protected TradeContract(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected TradeContract(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected TradeContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected TradeContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<ApprovalEventResponse> getApprovalEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = (List<EventValuesWithLog>) staticExtractEventParametersWithLog(APPROVAL_EVENT, transactionReceipt);
        ArrayList<ApprovalEventResponse> responses = new ArrayList<ApprovalEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ApprovalEventResponse typedResponse = new ApprovalEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ApprovalEventResponse getApprovalEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(APPROVAL_EVENT, log);
        ApprovalEventResponse typedResponse = new ApprovalEventResponse();
        typedResponse.log = log;
        typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getApprovalEventFromLog(log));
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPROVAL_EVENT));
        return approvalEventFlowable(filter);
    }

    public static List<BurnedEventResponse> getBurnedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = (List<EventValuesWithLog>) staticExtractEventParametersWithLog(BURNED_EVENT, transactionReceipt);
        ArrayList<BurnedEventResponse> responses = new ArrayList<BurnedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            BurnedEventResponse typedResponse = new BurnedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.userPK = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.from = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static BurnedEventResponse getBurnedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(BURNED_EVENT, log);
        BurnedEventResponse typedResponse = new BurnedEventResponse();
        typedResponse.log = log;
        typedResponse.userPK = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.from = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<BurnedEventResponse> burnedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getBurnedEventFromLog(log));
    }

    public Flowable<BurnedEventResponse> burnedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(BURNED_EVENT));
        return burnedEventFlowable(filter);
    }

    public static List<MintedEventResponse> getMintedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = (List<EventValuesWithLog>) staticExtractEventParametersWithLog(MINTED_EVENT, transactionReceipt);
        ArrayList<MintedEventResponse> responses = new ArrayList<MintedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            MintedEventResponse typedResponse = new MintedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.userPK = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.to = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static MintedEventResponse getMintedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(MINTED_EVENT, log);
        MintedEventResponse typedResponse = new MintedEventResponse();
        typedResponse.log = log;
        typedResponse.userPK = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.to = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<MintedEventResponse> mintedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getMintedEventFromLog(log));
    }

    public Flowable<MintedEventResponse> mintedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(MINTED_EVENT));
        return mintedEventFlowable(filter);
    }

    public static List<OwnershipTransferredEventResponse> getOwnershipTransferredEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = (List<EventValuesWithLog>) staticExtractEventParametersWithLog(OWNERSHIPTRANSFERRED_EVENT, transactionReceipt);
        ArrayList<OwnershipTransferredEventResponse> responses = new ArrayList<OwnershipTransferredEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            OwnershipTransferredEventResponse typedResponse = new OwnershipTransferredEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.previousOwner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.newOwner = (String) eventValues.getIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static OwnershipTransferredEventResponse getOwnershipTransferredEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(OWNERSHIPTRANSFERRED_EVENT, log);
        OwnershipTransferredEventResponse typedResponse = new OwnershipTransferredEventResponse();
        typedResponse.log = log;
        typedResponse.previousOwner = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.newOwner = (String) eventValues.getIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<OwnershipTransferredEventResponse> ownershipTransferredEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getOwnershipTransferredEventFromLog(log));
    }

    public Flowable<OwnershipTransferredEventResponse> ownershipTransferredEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(OWNERSHIPTRANSFERRED_EVENT));
        return ownershipTransferredEventFlowable(filter);
    }

    public static List<TransferEventResponse> getTransferEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = (List<EventValuesWithLog>) staticExtractEventParametersWithLog(TRANSFER_EVENT, transactionReceipt);
        ArrayList<TransferEventResponse> responses = new ArrayList<TransferEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            TransferEventResponse typedResponse = new TransferEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static TransferEventResponse getTransferEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(TRANSFER_EVENT, log);
        TransferEventResponse typedResponse = new TransferEventResponse();
        typedResponse.log = log;
        typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<TransferEventResponse> transferEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getTransferEventFromLog(log));
    }

    public Flowable<TransferEventResponse> transferEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TRANSFER_EVENT));
        return transferEventFlowable(filter);
    }

    public static List<TransferedEventResponse> getTransferedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = Collections.singletonList(staticExtractEventParametersWithLog(TRANSFERED_EVENT, transactionReceipt));
        ArrayList<TransferedEventResponse> responses = new ArrayList<TransferedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            TransferedEventResponse typedResponse = new TransferedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.customerPK = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.farmerPK = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.to = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.from = (String) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    private static EventValuesWithLog staticExtractEventParametersWithLog(Event transferedEvent, TransactionReceipt transactionReceipt) {
        return null;
    }

    public static TransferedEventResponse getTransferedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(TRANSFERED_EVENT, log);
        TransferedEventResponse typedResponse = new TransferedEventResponse();
        typedResponse.log = log;
        typedResponse.customerPK = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.farmerPK = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.to = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.from = (String) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(2).getValue();
        return typedResponse;
    }

    public Flowable<TransferedEventResponse> transferedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getTransferedEventFromLog(log));
    }

    public Flowable<TransferedEventResponse> transferedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TRANSFERED_EVENT));
        return transferedEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> adminBurn(String from, BigInteger amount, BigInteger userPK) {
        final Function function = new Function(
                FUNC_ADMINBURN, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from), 
                new org.web3j.abi.datatypes.generated.Uint256(amount), 
                new org.web3j.abi.datatypes.generated.Uint256(userPK)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> adminMint(String to, BigInteger amount, BigInteger userPK) {
        final Function function = new Function(
                FUNC_ADMINMINT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, to), 
                new org.web3j.abi.datatypes.generated.Uint256(amount), 
                new org.web3j.abi.datatypes.generated.Uint256(userPK)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> adminTransfer(String from, String to, BigInteger amount, BigInteger customerPK, BigInteger farmerPK) {
        final Function function = new Function(
                FUNC_ADMINTRANSFER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from), 
                new org.web3j.abi.datatypes.Address(160, to), 
                new org.web3j.abi.datatypes.generated.Uint256(amount), 
                new org.web3j.abi.datatypes.generated.Uint256(customerPK), 
                new org.web3j.abi.datatypes.generated.Uint256(farmerPK)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> allowance(String owner, String spender) {
        final Function function = new Function(FUNC_ALLOWANCE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, owner), 
                new org.web3j.abi.datatypes.Address(160, spender)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> approve(String spender, BigInteger value) {
        final Function function = new Function(
                FUNC_APPROVE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, spender), 
                new org.web3j.abi.datatypes.generated.Uint256(value)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> balanceOf(String account) {
        final Function function = new Function(FUNC_BALANCEOF, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, account)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> burn(BigInteger value) {
        final Function function = new Function(
                FUNC_BURN, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(value)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> burnFrom(String account, BigInteger value) {
        final Function function = new Function(
                FUNC_BURNFROM, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, account), 
                new org.web3j.abi.datatypes.generated.Uint256(value)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> decimals() {
        final Function function = new Function(FUNC_DECIMALS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> name() {
        final Function function = new Function(FUNC_NAME, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> renounceOwnership() {
        final Function function = new Function(
                FUNC_RENOUNCEOWNERSHIP, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> symbol() {
        final Function function = new Function(FUNC_SYMBOL, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> totalSupply() {
        final Function function = new Function(FUNC_TOTALSUPPLY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> transfer(String to, BigInteger value) {
        final Function function = new Function(
                FUNC_TRANSFER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, to), 
                new org.web3j.abi.datatypes.generated.Uint256(value)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferFrom(String from, String to, BigInteger value) {
        final Function function = new Function(
                FUNC_TRANSFERFROM, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, from), 
                new org.web3j.abi.datatypes.Address(160, to), 
                new org.web3j.abi.datatypes.generated.Uint256(value)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferOwnership(String newOwner) {
        final Function function = new Function(
                FUNC_TRANSFEROWNERSHIP, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, newOwner)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static TradeContract load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new TradeContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static TradeContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new TradeContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static TradeContract load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new TradeContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static TradeContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new TradeContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<TradeContract> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, String initialOwner) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, initialOwner)));
        return deployRemoteCall(TradeContract.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<TradeContract> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, String initialOwner) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, initialOwner)));
        return deployRemoteCall(TradeContract.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TradeContract> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String initialOwner) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, initialOwner)));
        return deployRemoteCall(TradeContract.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TradeContract> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String initialOwner) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, initialOwner)));
        return deployRemoteCall(TradeContract.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    public static class ApprovalEventResponse extends BaseEventResponse {
        public String owner;

        public String spender;

        public BigInteger value;
    }

    public static class BurnedEventResponse extends BaseEventResponse {
        public BigInteger userPK;

        public String from;

        public BigInteger amount;
    }

    public static class MintedEventResponse extends BaseEventResponse {
        public BigInteger userPK;

        public String to;

        public BigInteger amount;
    }

    public static class OwnershipTransferredEventResponse extends BaseEventResponse {
        public String previousOwner;

        public String newOwner;
    }

    public static class TransferEventResponse extends BaseEventResponse {
        public String from;

        public String to;

        public BigInteger value;
    }

    public static class TransferedEventResponse extends BaseEventResponse {
        public BigInteger customerPK;

        public BigInteger farmerPK;

        public String to;

        public String from;

        public BigInteger amount;
    }
}
