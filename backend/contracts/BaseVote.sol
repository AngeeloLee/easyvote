// pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

/// @title 基础投票合约 v1.1 2021.3.20
/// @author 李世东升 西南交通大学，信息科学与技术学院
contract BaseVote {
    /// @notice 候选人 结构体
    struct Candidate {
        string name;       // 简称
        uint ballot;       // 得票
        bool valid;        // 有效标记 
    }

    /// @notice 投票人 结构体
    struct Voter {
        uint weight;        // 投票权重
        bool voted;         // 投票状态
        address delegate;   // 被委托人
        bytes16 proposal;   // 所投候选人
        bool valid;         // 有效标记
    }

    /// @notice 候选人信息
    struct CandidateInfo {
        bytes16 key;
        string name;
        uint ballot;
    }
    
    string public title;        // 合约标题
    uint public expiry;         // 合约有效期
    address public proposer;    // 发起人
    bool public open;           // 是否公开投票
    uint totalVoter;            // 总投票人数
    uint doneVoter;             // 已完成投票人数
    bytes16[] candidateKeys;    // 候选人键数组
    mapping (bytes16 => Candidate) candidates;  // 候选人数组
    mapping (address => Voter) voters;          // 投票人数组


    /// @notice 有效期检查
    modifier valid() {
        require(block.timestamp < expiry, "ERR-01: The vooting has closed.");
        _;
    }

    /// @notice 只允许发起人操作
    modifier proposerOnly() {
        require(msg.sender == proposer, "ERR-02: Only chairperson can give right to vote.");
        _;
    }

    /// @notice 候选人存在
    /// @param cand bytes16 候选人key
    modifier existCandidate(bytes16 cand) {
        require(candidates[cand].valid, "ERR-03: The candidate dose not exist.");
        _;
    }

    /// @notice 具有投票权限
    /// @param voter address 投票人地址
    modifier votable(address voter) {
        if (!open) {
            require(voters[voter].valid, "ERR-04: Do not have voting rights.");
        }
        _;
    }

    /// @notice 还未投票
    /// @param voter address 投票人地址
    modifier didnotVote(address voter) {
        if (!open) {
            require(!voters[voter].voted, "ERR-05: The voter already voted.");
        }
        _;
    }

    /// @notice 发起人或投票人
    /// @param sender 发送者
    modifier proposerOrVoter(address sender) {
        require(sender == proposer || voters[sender].valid, "ERR-06: Do not have access rights.");
        _;
    }

    /// @notice 构造
    /// @param keys bytes16[] 候选人简称的MD5哈希数组
    /// @param cands string[] 候选人简称数组
    /// @param parts address[] 参与人地址数组
    constructor(bytes16[] memory keys, string[] memory cands, address[] memory parts, bool pub, uint lifetime) public {
        proposer = msg.sender;
        open = pub;
        candidateKeys = new bytes16[](keys.length);
        totalVoter = uint(keys.length);
        doneVoter = uint(0);
        expiry = block.timestamp + lifetime;
        for (uint i=0; i<keys.length; i++) {
            candidateKeys.push(keys[i]);
            candidates[keys[i]] = Candidate({
                name: cands[i],
                ballot: 0,
                valid: true
            });
        }
        for (uint i=0; i<parts.length; i++) {
            voters[parts[i]] = Voter({
                weight: 1,
                voted: false,
                proposal: bytes16(0x0),
                delegate: address(0x0),
                valid: true
            });
        }
    }

    /// @notice 授权投票
    /// @param voter address - 待授权的投票人
    function giveRightToVote(address voter) public valid proposerOnly didnotVote(voter) {
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /// @notice 投票
    /// @param cand bytes16 - 所支持的候选人
    function vote(bytes16 cand) public valid existCandidate(cand) votable(msg.sender) didnotVote(msg.sender) {
        doneVoter += 1;
        Voter storage voter = voters[msg.sender];
        voter.voted = true;
        voter.proposal = cand;
        candidates[cand].ballot += voter.weight;
    }

    /// @notice 获取所有候选人信息
    /// @return cands CandidateInfo[] - 候选人数组
    function getAllCandidates() public view proposerOrVoter(msg.sender) returns(CandidateInfo[] memory cands) {
        CandidateInfo[] memory candInfos = new CandidateInfo[](candidateKeys.length);
        for (uint i=0; i<candidateKeys.length; i++) {
            candInfos[i] = CandidateInfo({
                key: candidateKeys[i],
                name: candidates[candidateKeys[i]].name,
                ballot: candidates[candidateKeys[i]].ballot
            });
        }
        return candInfos;
    }
    
    /// @notice 获取单个候选人信息
    /// @param key bytes16 - 候选人key
    /// @return cand CandidateInfo - 候选人信息
    function getOneCandidate(bytes16 key) public view proposerOrVoter(msg.sender) existCandidate(key) returns(CandidateInfo memory cand) {
        return CandidateInfo({
            key: key,
            name: candidates[key].name,
            ballot: candidates[key].ballot
        });
    }

    /// @notice 获取投票情况
    /// @return total uint - 预定总投票人数
    /// @return done uint - 实际完成投票人数
    function getCandition() public view proposerOrVoter(msg.sender) returns(uint total, uint done) {
        return (totalVoter, doneVoter);
    }
}