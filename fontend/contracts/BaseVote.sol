pragma solidity >=0.4.22 <0.9.0;

/// @title 基础投票合约 v1.0 2021.1.24
/// @author 李世东升 西南交通大学，信息科学与技术学院
contract BaseVote {
    /// @notice 候选人 结构体
    struct Candidate {
        bytes32 name;       // 简称
        uint ballot;        // 得票
        bytes32 describe;   // 简单描述
    }

    /// @notice 投票人 结构体
    struct Voter {
        uint weight;        // 投票权重
        bool voted;         // 投票状态
        address delegate;   // 被委托人
        bytes16 proposal;   // 所投候选人
    }
    
    uint public period;         // 合约有效期
    address public proposer;    // 发起人
    address[] participants;     // 参与人数组
    bytes16[] candidateKeys;    // 候选人key数组
    mapping (bytes16 => Candidate) candidates;  // 候选人数组
    mapping (address => Voter) voters;          // 投票人数组

    /// @notice 有效期检查
    modifier inPeriod() {
        if (block.timestamp < period) {
            _;
        }
    }

    /// @notice 只允许发起人操作 修饰器
    modifier proposerOnly() {
        require(msg.sender == proposer, "Only chairperson can give right to vote.");
        _;
    }

    /// @notice 还未投票 修饰器
    /// @param voter address 投票人地址
    modifier didnotVote(address voter) {
        require(!voters[voter].voted, "The voter already voted.");
        _;
    }

    /// @notice 具有投票权限 修饰器
    /// @param voter address 投票人地址
    modifier votable(address voter) {
        for (uint i=0; i<participants.length; i++) {
            if (voter == participants[i]) {
                _;
                break;
            }
        }
    }

    /// @notice 候选人存在 修饰器
    /// @param cand bytes16 候选人key
    modifier existCandidate(bytes16 cand) {
        for (uint i=0; i<candidateKeys.length; i++) {
            if (cand == candidateKeys[i]) {
                _;
                break;
            }
        }
    }

    /// @notice 构造
    /// @param candNames byte32[] 候选人简称数组
    /// @param candDescs byte32[] 候选人描述数组
    constructor(bytes16[] memory keys, bytes32[] memory candNames, bytes32[] memory candDescs) {
        proposer = msg.sender;
        voters[proposer].weight = 1;
        for (uint i=0; i<keys.length; i++) {
            candidateKeys.push(keys[i]);
            candidates[keys[i]] = Candidate({
                name: candNames[i],
                describe: candDescs[i],
                ballot: 0
            });
        }
    }

    /// @notice 授权投票
    /// @param voter address 待授权的投票人
    function giveRightToVote(address voter) public inPeriod proposerOnly didnotVote(voter) {
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /// @notice 投票
    /// @param cand bytes16 所支持的候选人
    function vote(bytes16 cand) public inPeriod existCandidate(cand) didnotVote(msg.sender) votable(msg.sender) {
        Voter storage voter = voters[msg.sender];
        voter.voted = true;
        voter.proposal = cand;
        candidates[cand].ballot += voter.weight;
    }

    /// @notice 获取所有候选人的key
    /// @return keys bytes16[] 候选人key数组
    function getCandidateKeys() public view returns(bytes16[] memory keys) {
        return candidateKeys;
    }
    
    /// @notice 获取单个候选人信息
    /// @param key bytes16 候选人key
    /// @return name bytes32 候选人简称
    /// @return desc bytes32 候选人简介
    /// @return ballot uint 候选人得票数
    function getOneCandidate(bytes16 key) public view existCandidate(key) returns(bytes32 name, bytes32 desc, uint ballot) {
        return (candidates[key].name, candidates[key].describe, candidates[key].ballot);
    }
}