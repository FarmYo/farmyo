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
import org.web3j.abi.datatypes.StaticStruct;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;
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
    public static final String BINARY = "608060405234801561000f575f80fd5b503360045f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506123778061005d5f395ff3fe608060405234801561000f575f80fd5b50600436106100cc575f3560e01c80638da5cb5b1161008a578063defeb3f111610064578063defeb3f11461024d578063e1a0980f14610280578063e9945a33146102b0578063ff982551146102cc576100cc565b80638da5cb5b146101cb578063a5f1e3ce146101e9578063cb31ef4c1461021c576100cc565b8062116049146100d05780631ee93ebb146100ec57806320474e841461011c578063668f2a741461014c57806377a4296a146101685780637db6a11814610198575b5f80fd5b6100ea60048036038101906100e591906115b7565b6102e8565b005b61010660048036038101906101019190611653565b6104c0565b6040516101139190611844565b60405180910390f35b61013660048036038101906101319190611653565b610672565b60405161014391906118cb565b60405180910390f35b610166600480360381019061016191906118eb565b6107e1565b005b610182600480360381019061017d9190611653565b61098c565b60405161018f91906119fe565b60405180910390f35b6101b260048036038101906101ad91906118eb565b610a1e565b6040516101c29493929190611a84565b60405180910390f35b6101d3610b7c565b6040516101e09190611b14565b60405180910390f35b61020360048036038101906101fe9190611653565b610ba1565b6040516102139493929190611a84565b60405180910390f35b610236600480360381019061023191906118eb565b610ce4565b604051610244929190611b2d565b60405180910390f35b610267600480360381019061026291906118eb565b610d2a565b6040516102779493929190611a84565b60405180910390f35b61029a60048036038101906102959190611653565b610e88565b6040516102a79190611c76565b60405180910390f35b6102ca60048036038101906102c591906115b7565b61103a565b005b6102e660048036038101906102e191906115b7565b6111f8565b005b60045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610377576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036e90611d06565b60405180910390fd5b610380846113d0565b6103bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b690611d94565b60405180910390fd5b6103c8846113ef565b15610408576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ff90611e22565b60405180910390fd5b60025f8581526020019081526020015f206040518060800160405280600260ff16815260200185815260200184815260200183815250908060018154018082558091505060019003905f5260205f2090600402015f909190919091505f820151815f015f6101000a81548160ff021916908360ff1602179055506020820151816001019081610497919061203a565b5060408201518160020190816104ad919061203a565b5060608201518160030155505050505050565b606060015f8381526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b82821015610667578382905f5260205f2090600402016040518060800160405290815f82015f9054906101000a900460ff1660ff1660ff16815260200160018201805461053e90611e6d565b80601f016020809104026020016040519081016040528092919081815260200182805461056a90611e6d565b80156105b55780601f1061058c576101008083540402835291602001916105b5565b820191905f5260205f20905b81548152906001019060200180831161059857829003601f168201915b505050505081526020016002820180546105ce90611e6d565b80601f01602080910402602001604051908101604052809291908181526020018280546105fa90611e6d565b80156106455780601f1061061c57610100808354040283529160200191610645565b820191905f5260205f20905b81548152906001019060200180831161062857829003601f168201915b50505050508152602001600382015481525050815260200190600101906104f2565b505050509050919050565b61067a61140e565b5f808381526020019081526020015f206040518060800160405290815f82015f9054906101000a900460ff1660ff1660ff1681526020016001820180546106c090611e6d565b80601f01602080910402602001604051908101604052809291908181526020018280546106ec90611e6d565b80156107375780601f1061070e57610100808354040283529160200191610737565b820191905f5260205f20905b81548152906001019060200180831161071a57829003601f168201915b5050505050815260200160028201805461075090611e6d565b80601f016020809104026020016040519081016040528092919081815260200182805461077c90611e6d565b80156107c75780601f1061079e576101008083540402835291602001916107c7565b820191905f5260205f20905b8154815290600101906020018083116107aa57829003601f168201915b505050505081526020016003820154815250509050919050565b60045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610870576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086790611d06565b60405180910390fd5b610879826113d0565b6108b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108af90612179565b60405180910390fd5b5f60035f8481526020019081526020015f20805490501461090e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090590612207565b60405180910390fd5b60035f8381526020019081526020015f206040518060400160405280600360ff16815260200183815250908060018154018082558091505060019003905f5260205f2090600202015f909190919091505f820151815f015f6101000a81548160ff021916908360ff1602179055506020820151816001015550505050565b606060035f8381526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b82821015610a13578382905f5260205f2090600202016040518060400160405290815f82015f9054906101000a900460ff1660ff1660ff168152602001600182015481525050815260200190600101906109be565b505050509050919050565b6001602052815f5260405f208181548110610a37575f80fd5b905f5260205f2090600402015f9150915050805f015f9054906101000a900460ff1690806001018054610a6990611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610a9590611e6d565b8015610ae05780601f10610ab757610100808354040283529160200191610ae0565b820191905f5260205f20905b815481529060010190602001808311610ac357829003601f168201915b505050505090806002018054610af590611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610b2190611e6d565b8015610b6c5780601f10610b4357610100808354040283529160200191610b6c565b820191905f5260205f20905b815481529060010190602001808311610b4f57829003601f168201915b5050505050908060030154905084565b60045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f602052805f5260405f205f91509050805f015f9054906101000a900460ff1690806001018054610bd190611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610bfd90611e6d565b8015610c485780601f10610c1f57610100808354040283529160200191610c48565b820191905f5260205f20905b815481529060010190602001808311610c2b57829003601f168201915b505050505090806002018054610c5d90611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610c8990611e6d565b8015610cd45780601f10610cab57610100808354040283529160200191610cd4565b820191905f5260205f20905b815481529060010190602001808311610cb757829003601f168201915b5050505050908060030154905084565b6003602052815f5260405f208181548110610cfd575f80fd5b905f5260205f2090600202015f9150915050805f015f9054906101000a900460ff16908060010154905082565b6002602052815f5260405f208181548110610d43575f80fd5b905f5260205f2090600402015f9150915050805f015f9054906101000a900460ff1690806001018054610d7590611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610da190611e6d565b8015610dec5780601f10610dc357610100808354040283529160200191610dec565b820191905f5260205f20905b815481529060010190602001808311610dcf57829003601f168201915b505050505090806002018054610e0190611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610e2d90611e6d565b8015610e785780601f10610e4f57610100808354040283529160200191610e78565b820191905f5260205f20905b815481529060010190602001808311610e5b57829003601f168201915b5050505050908060030154905084565b606060025f8381526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b8282101561102f578382905f5260205f2090600402016040518060800160405290815f82015f9054906101000a900460ff1660ff1660ff168152602001600182018054610f0690611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610f3290611e6d565b8015610f7d5780601f10610f5457610100808354040283529160200191610f7d565b820191905f5260205f20905b815481529060010190602001808311610f6057829003601f168201915b50505050508152602001600282018054610f9690611e6d565b80601f0160208091040260200160405190810160405280929190818152602001828054610fc290611e6d565b801561100d5780601f10610fe45761010080835404028352916020019161100d565b820191905f5260205f20905b815481529060010190602001808311610ff057829003601f168201915b5050505050815260200160038201548152505081526020019060010190610eba565b505050509050919050565b60045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146110c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110c090611d06565b60405180910390fd5b6110d2846113ef565b15611112576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161110990611e22565b60405180910390fd5b5f805f8681526020019081526020015f206003015414611167576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161115e90612295565b60405180910390fd5b60405180608001604052805f60ff168152602001848152602001838152602001828152505f808681526020019081526020015f205f820151815f015f6101000a81548160ff021916908360ff16021790555060208201518160010190816111ce919061203a565b5060408201518160020190816111e4919061203a565b506060820151816003015590505050505050565b60045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611287576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127e90611d06565b60405180910390fd5b611290846113d0565b6112cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112c690612323565b60405180910390fd5b6112d8846113ef565b15611318576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161130f90611e22565b60405180910390fd5b60015f8581526020019081526020015f206040518060800160405280600160ff16815260200185815260200184815260200183815250908060018154018082558091505060019003905f5260205f2090600402015f909190919091505f820151815f015f6101000a81548160ff021916908360ff16021790555060208201518160010190816113a7919061203a565b5060408201518160020190816113bd919061203a565b5060608201518160030155505050505050565b5f805f808481526020019081526020015f206003015414159050919050565b5f8060035f8481526020019081526020015f2080549050119050919050565b60405180608001604052805f60ff16815260200160608152602001606081526020015f81525090565b5f604051905090565b5f80fd5b5f80fd5b5f819050919050565b61145a81611448565b8114611464575f80fd5b50565b5f8135905061147581611451565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6114c982611483565b810181811067ffffffffffffffff821117156114e8576114e7611493565b5b80604052505050565b5f6114fa611437565b905061150682826114c0565b919050565b5f67ffffffffffffffff82111561152557611524611493565b5b61152e82611483565b9050602081019050919050565b828183375f83830152505050565b5f61155b6115568461150b565b6114f1565b9050828152602081018484840111156115775761157661147f565b5b61158284828561153b565b509392505050565b5f82601f83011261159e5761159d61147b565b5b81356115ae848260208601611549565b91505092915050565b5f805f80608085870312156115cf576115ce611440565b5b5f6115dc87828801611467565b945050602085013567ffffffffffffffff8111156115fd576115fc611444565b5b6116098782880161158a565b935050604085013567ffffffffffffffff81111561162a57611629611444565b5b6116368782880161158a565b925050606061164787828801611467565b91505092959194509250565b5f6020828403121561166857611667611440565b5b5f61167584828501611467565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f60ff82169050919050565b6116bc816116a7565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f5b838110156116f95780820151818401526020810190506116de565b5f8484015250505050565b5f61170e826116c2565b61171881856116cc565b93506117288185602086016116dc565b61173181611483565b840191505092915050565b61174581611448565b82525050565b5f608083015f8301516117605f8601826116b3565b50602083015184820360208601526117788282611704565b915050604083015184820360408601526117928282611704565b91505060608301516117a7606086018261173c565b508091505092915050565b5f6117bd838361174b565b905092915050565b5f602082019050919050565b5f6117db8261167e565b6117e58185611688565b9350836020820285016117f785611698565b805f5b85811015611832578484038952815161181385826117b2565b945061181e836117c5565b925060208a019950506001810190506117fa565b50829750879550505050505092915050565b5f6020820190508181035f83015261185c81846117d1565b905092915050565b5f608083015f8301516118795f8601826116b3565b50602083015184820360208601526118918282611704565b915050604083015184820360408601526118ab8282611704565b91505060608301516118c0606086018261173c565b508091505092915050565b5f6020820190508181035f8301526118e38184611864565b905092915050565b5f806040838503121561190157611900611440565b5b5f61190e85828601611467565b925050602061191f85828601611467565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b604082015f8201516119665f8501826116b3565b506020820151611979602085018261173c565b50505050565b5f61198a8383611952565b60408301905092915050565b5f602082019050919050565b5f6119ac82611929565b6119b68185611933565b93506119c183611943565b805f5b838110156119f15781516119d8888261197f565b97506119e383611996565b9250506001810190506119c4565b5085935050505092915050565b5f6020820190508181035f830152611a1681846119a2565b905092915050565b611a27816116a7565b82525050565b5f82825260208201905092915050565b5f611a47826116c2565b611a518185611a2d565b9350611a618185602086016116dc565b611a6a81611483565b840191505092915050565b611a7e81611448565b82525050565b5f608082019050611a975f830187611a1e565b8181036020830152611aa98186611a3d565b90508181036040830152611abd8185611a3d565b9050611acc6060830184611a75565b95945050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f611afe82611ad5565b9050919050565b611b0e81611af4565b82525050565b5f602082019050611b275f830184611b05565b92915050565b5f604082019050611b405f830185611a1e565b611b4d6020830184611a75565b9392505050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f608083015f830151611b925f8601826116b3565b5060208301518482036020860152611baa8282611704565b91505060408301518482036040860152611bc48282611704565b9150506060830151611bd9606086018261173c565b508091505092915050565b5f611bef8383611b7d565b905092915050565b5f602082019050919050565b5f611c0d82611b54565b611c178185611b5e565b935083602082028501611c2985611b6e565b805f5b85811015611c645784840389528151611c458582611be4565b9450611c5083611bf7565b925060208a01995050600181019050611c2c565b50829750879550505050505092915050565b5f6020820190508181035f830152611c8e8184611c03565b905092915050565b7f546869732066756e6374696f6e2063616e2062652063616c6c656420627920745f8201527f6865206f776e6572206f6e6c792e000000000000000000000000000000000000602082015250565b5f611cf0602e83611a2d565b9150611cfb82611c96565b604082019050919050565b5f6020820190508181035f830152611d1d81611ce4565b9050919050565b7f506c616e74696e67496e666f206d75737420657869737420746f2061646420435f8201527f6f6e74657374496e666f2e000000000000000000000000000000000000000000602082015250565b5f611d7e602b83611a2d565b9150611d8982611d24565b604082019050919050565b5f6020820190508181035f830152611dab81611d72565b9050919050565b7f43616e6e6f7420616464206e657720696e666f206166746572206861727665735f8201527f742e000000000000000000000000000000000000000000000000000000000000602082015250565b5f611e0c602283611a2d565b9150611e1782611db2565b604082019050919050565b5f6020820190508181035f830152611e3981611e00565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680611e8457607f821691505b602082108103611e9757611e96611e40565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302611ef97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611ebe565b611f038683611ebe565b95508019841693508086168417925050509392505050565b5f819050919050565b5f611f3e611f39611f3484611448565b611f1b565b611448565b9050919050565b5f819050919050565b611f5783611f24565b611f6b611f6382611f45565b848454611eca565b825550505050565b5f90565b611f7f611f73565b611f8a818484611f4e565b505050565b5b81811015611fad57611fa25f82611f77565b600181019050611f90565b5050565b601f821115611ff257611fc381611e9d565b611fcc84611eaf565b81016020851015611fdb578190505b611fef611fe785611eaf565b830182611f8f565b50505b505050565b5f82821c905092915050565b5f6120125f1984600802611ff7565b1980831691505092915050565b5f61202a8383612003565b9150826002028217905092915050565b612043826116c2565b67ffffffffffffffff81111561205c5761205b611493565b5b6120668254611e6d565b612071828285611fb1565b5f60209050601f8311600181146120a2575f8415612090578287015190505b61209a858261201f565b865550612101565b601f1984166120b086611e9d565b5f5b828110156120d7578489015182556001820191506020850194506020810190506120b2565b868310156120f457848901516120f0601f891682612003565b8355505b6001600288020188555050505b505050505050565b7f506c616e74696e67496e666f206d75737420657869737420746f2061646420485f8201527f617276657374496e666f2e000000000000000000000000000000000000000000602082015250565b5f612163602b83611a2d565b915061216e82612109565b604082019050919050565b5f6020820190508181035f83015261219081612157565b9050919050565b7f48617276657374496e666f20616c72656164792065786973747320666f7220745f8201527f68697320504b2e00000000000000000000000000000000000000000000000000602082015250565b5f6121f1602783611a2d565b91506121fc82612197565b604082019050919050565b5f6020820190508181035f83015261221e816121e5565b9050919050565b7f506c616e74696e67496e666f20616c72656164792065786973747320666f72205f8201527f7468697320504b2e000000000000000000000000000000000000000000000000602082015250565b5f61227f602883611a2d565b915061228a82612225565b604082019050919050565b5f6020820190508181035f8301526122ac81612273565b9050919050565b7f506c616e74696e67496e666f206d75737420657869737420746f2061646420555f8201527f73616765496e666f2e0000000000000000000000000000000000000000000000602082015250565b5f61230d602983611a2d565b9150612318826122b3565b604082019050919050565b5f6020820190508181035f83015261233a81612301565b905091905056fea26469706673582212203a3f592c61028d8b5fe1e61dc24c960dbebef585a09d562edda4c78076e6661464736f6c63430008180033";

    public static final String FUNC_ADDCONTESTINFO = "addContestInfo";

    public static final String FUNC_ADDHARVESTINFO = "addHarvestInfo";

    public static final String FUNC_ADDPLANTINGINFO = "addPlantingInfo";

    public static final String FUNC_ADDUSAGEINFO = "addUsageInfo";

    public static final String FUNC_CONTESTINFOS = "contestInfos";

    public static final String FUNC_GETCONTESTINFOS = "getContestInfos";

    public static final String FUNC_GETHARVESTINFOS = "getHarvestInfos";

    public static final String FUNC_GETPLANTINGINFOS = "getPlantingInfos";

    public static final String FUNC_GETUSAGEINFOS = "getUsageInfos";

    public static final String FUNC_HARVESTINFOS = "harvestInfos";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_PLANTINGINFOS = "plantingInfos";

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

    public RemoteFunctionCall<TransactionReceipt> addContestInfo(BigInteger _cropPK, String _contestName, String _awardDetails, BigInteger _eventDate) {
        final Function function = new Function(
                FUNC_ADDCONTESTINFO,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK),
                        new org.web3j.abi.datatypes.Utf8String(_contestName),
                        new org.web3j.abi.datatypes.Utf8String(_awardDetails),
                        new org.web3j.abi.datatypes.generated.Uint256(_eventDate)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addHarvestInfo(BigInteger _cropPK, BigInteger _eventDate) {
        final Function function = new Function(
                FUNC_ADDHARVESTINFO,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK),
                        new org.web3j.abi.datatypes.generated.Uint256(_eventDate)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addPlantingInfo(BigInteger _cropPK, String _cropName, String _land, BigInteger _eventDate) {
        final Function function = new Function(
                FUNC_ADDPLANTINGINFO,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK),
                        new org.web3j.abi.datatypes.Utf8String(_cropName),
                        new org.web3j.abi.datatypes.Utf8String(_land),
                        new org.web3j.abi.datatypes.generated.Uint256(_eventDate)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addUsageInfo(BigInteger _cropPK, String _pesticideName, String _pesticideType, BigInteger _eventDate) {
        final Function function = new Function(
                FUNC_ADDUSAGEINFO,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK),
                        new org.web3j.abi.datatypes.Utf8String(_pesticideName),
                        new org.web3j.abi.datatypes.Utf8String(_pesticideType),
                        new org.web3j.abi.datatypes.generated.Uint256(_eventDate)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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

    public RemoteFunctionCall<List> getHarvestInfos(BigInteger _cropPK) {
        final Function function = new Function(FUNC_GETHARVESTINFOS,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK)),
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<HarvestInfo>>() {}));
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

    public RemoteFunctionCall<PlantingInfo> getPlantingInfos(BigInteger _cropPK) {
        final Function function = new Function(FUNC_GETPLANTINGINFOS,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_cropPK)),
                Arrays.<TypeReference<?>>asList(new TypeReference<PlantingInfo>() {}));
        return executeRemoteCallSingleValueReturn(function, PlantingInfo.class);
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

    public RemoteFunctionCall<Tuple2<BigInteger, BigInteger>> harvestInfos(BigInteger param0, BigInteger param1) {
        final Function function = new Function(FUNC_HARVESTINFOS,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0),
                        new org.web3j.abi.datatypes.generated.Uint256(param1)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple2<BigInteger, BigInteger>>(function,
                new Callable<Tuple2<BigInteger, BigInteger>>() {
                    @Override
                    public Tuple2<BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<BigInteger, BigInteger>(
                                (BigInteger) results.get(0).getValue(),
                                (BigInteger) results.get(1).getValue());
                    }
                });
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Tuple4<BigInteger, String, String, BigInteger>> plantingInfos(BigInteger param0) {
        final Function function = new Function(FUNC_PLANTINGINFOS,
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

    public static class ContestInfo extends DynamicStruct {
        public BigInteger infoType;

        public String contestName;

        public String awardDetails;

        public BigInteger eventDate;

        public ContestInfo(BigInteger infoType, String contestName, String awardDetails, BigInteger eventDate) {
            super(new org.web3j.abi.datatypes.generated.Uint8(infoType),
                    new org.web3j.abi.datatypes.Utf8String(contestName),
                    new org.web3j.abi.datatypes.Utf8String(awardDetails),
                    new org.web3j.abi.datatypes.generated.Uint256(eventDate));
            this.infoType = infoType;
            this.contestName = contestName;
            this.awardDetails = awardDetails;
            this.eventDate = eventDate;
        }

        public ContestInfo(Uint8 infoType, Utf8String contestName, Utf8String awardDetails, Uint256 eventDate) {
            super(infoType, contestName, awardDetails, eventDate);
            this.infoType = infoType.getValue();
            this.contestName = contestName.getValue();
            this.awardDetails = awardDetails.getValue();
            this.eventDate = eventDate.getValue();
        }
    }

    public static class HarvestInfo extends StaticStruct {
        public BigInteger infoType;

        public BigInteger eventDate;

        public HarvestInfo(BigInteger infoType, BigInteger eventDate) {
            super(new org.web3j.abi.datatypes.generated.Uint8(infoType),
                    new org.web3j.abi.datatypes.generated.Uint256(eventDate));
            this.infoType = infoType;
            this.eventDate = eventDate;
        }

        public HarvestInfo(Uint8 infoType, Uint256 eventDate) {
            super(infoType, eventDate);
            this.infoType = infoType.getValue();
            this.eventDate = eventDate.getValue();
        }
    }

    public static class PlantingInfo extends DynamicStruct {
        public BigInteger infoType;

        public String cropName;

        public String land;

        public BigInteger eventDate;

        public PlantingInfo(BigInteger infoType, String cropName, String land, BigInteger eventDate) {
            super(new org.web3j.abi.datatypes.generated.Uint8(infoType),
                    new org.web3j.abi.datatypes.Utf8String(cropName),
                    new org.web3j.abi.datatypes.Utf8String(land),
                    new org.web3j.abi.datatypes.generated.Uint256(eventDate));
            this.infoType = infoType;
            this.cropName = cropName;
            this.land = land;
            this.eventDate = eventDate;
        }

        public PlantingInfo(Uint8 infoType, Utf8String cropName, Utf8String land, Uint256 eventDate) {
            super(infoType, cropName, land, eventDate);
            this.infoType = infoType.getValue();
            this.cropName = cropName.getValue();
            this.land = land.getValue();
            this.eventDate = eventDate.getValue();
        }
    }

    public static class UsageInfo extends DynamicStruct {
        public BigInteger infoType;

        public String pesticideName;

        public String pesticideType;

        public BigInteger eventDate;

        public UsageInfo(BigInteger infoType, String pesticideName, String pesticideType, BigInteger eventDate) {
            super(new org.web3j.abi.datatypes.generated.Uint8(infoType),
                    new org.web3j.abi.datatypes.Utf8String(pesticideName),
                    new org.web3j.abi.datatypes.Utf8String(pesticideType),
                    new org.web3j.abi.datatypes.generated.Uint256(eventDate));
            this.infoType = infoType;
            this.pesticideName = pesticideName;
            this.pesticideType = pesticideType;
            this.eventDate = eventDate;
        }

        public UsageInfo(Uint8 infoType, Utf8String pesticideName, Utf8String pesticideType, Uint256 eventDate) {
            super(infoType, pesticideName, pesticideType, eventDate);
            this.infoType = infoType.getValue();
            this.pesticideName = pesticideName.getValue();
            this.pesticideType = pesticideType.getValue();
            this.eventDate = eventDate.getValue();
        }
    }
}
