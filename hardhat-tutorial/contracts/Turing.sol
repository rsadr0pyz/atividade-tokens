//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


// This is the main building block for smart contracts.
contract Turing is ERC20{
    address public owner;

    mapping(string => address) public addrOf;
    mapping(address => string) public codinomeOf;

    string[] private codinomes;

    mapping(address => mapping(string => bool)) public votes;
    mapping(address => uint256) voteCount;

    bool public voting = true;

    constructor() ERC20("Turing", "TUR") {
        owner = msg.sender;
        _user_set("roberta",   0x502542668aF09fa7aea52174b9965A7799343Df7);
        _user_set("nome1",     0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        _user_set("nome2",     0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC);
        _user_set("nome3",     0x90F79bf6EB2c4f870365E785982E1f101E93b906);
        _user_set("nome4",     0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65);
        _user_set("nome5",     0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc);
    }

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Apenas o owner/professora pode atualizar usuarios.");
        _;
    }

    modifier validCodinome(string memory codinome)
    {
        require(bytes(codinome).length > 0, "O codinome deve ser valido.");
        _;
    }

    modifier registeredCodinome(string memory codinome) 
    {
        require(addrOf[codinome] != address(0), "O codinome nao esta cadastrado.");
        _;
    }

    function _user_set(string memory codinome, address addr) private
        validCodinome(codinome)
    {
        require(addr != address(0), "Endereco invalido.");
        codinomeOf[addr] = codinome;
        addrOf[codinome] = addr;
        codinomes.push(codinome);
    }

    function updateUser(string memory codinome, address user_addr) public 
        onlyAdmin 
        validCodinome(codinome) 
    {
        _user_set(codinome, user_addr);
    }

    function votingOn() public onlyAdmin
    {
        voting = true;
    }

    function votingOff() public onlyAdmin
    {
        voting = false;
    }

    function issueToken(string memory codinome , uint256 qtde_de_Turings) public onlyAdmin 
        validCodinome(codinome) 
        registeredCodinome(codinome)
    {
        qtde_de_Turings = qtde_de_Turings *  10 ** decimals();
        _mint(addrOf[codinome], qtde_de_Turings);
    }


    function vote(string memory codinome , uint256 qtde_de_Turings)  public
        validCodinome(codinome)
        registeredCodinome(codinome)
    {
        require(voting == true, "A votacao ainda nao esta ativa!");
        require(addrOf[codinome] != msg.sender, "Nao pode votar em si mesmo.");
        require(bytes(codinomeOf[msg.sender]).length > 0, "Precisa ser autorizado para votar.");
        require(qtde_de_Turings > 0 && qtde_de_Turings <= 2, "Quantidade de turings deve estar no intervalo [1, 2]");
        require(votes[msg.sender][codinome] == false, "Nao pode repetir voto.");
        qtde_de_Turings = qtde_de_Turings * 10 ** decimals();

        
        _mint(addrOf[codinome], qtde_de_Turings);

        // a cada 10 votos ganhar 1 turing
        votes[msg.sender][codinome] = true;
        voteCount[msg.sender]++;
        if(voteCount[msg.sender] % 10 == 0) _mint(msg.sender, 1 * 10 ** decimals());
    }

    function getAlunos() public view
        returns (string[] memory nomes, address[] memory enderecos, uint256[] memory saldos)
    {
        uint256 n = 0;
        for (uint256 i = 0; i < codinomes.length; i++) {
            if (!isAdmin(addrOf[codinomes[i]])) n++;
        }

        nomes = new string[](n);
        enderecos = new address[](n);
        saldos = new uint256[](n);

        uint256 j = 0;
        for (uint256 i = 0; i < codinomes.length; i++) {
            address a = addrOf[codinomes[i]];
            if (isAdmin(a)) continue;
            nomes[j] = codinomes[i];
            enderecos[j] = a;
            saldos[j] = balanceOf(a);
            j++;
        }
    }

    function isAdmin(address account) public view returns (bool) {
        return account == owner || account == addrOf["roberta"];
    }
}