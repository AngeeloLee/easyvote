pragma solidity 0.8.2;

/// @title 投票合约 v1.1 2021-4-7
/// @author 李世东升 西南交通大学，计算机与人工智能学院
contract Poll {
    /// @notice 候选人
    struct Candidate {
        bytes16 key;    // 唯一键
        string name;    // 简称
        uint ballot;    // 得票数
        bool valid;     // 是否有效
    }

    /// @notice 投票人
    struct Voter {
        bool voted;     // 是否已投票
        bool valid;     // 是否有效
    }

    /// @notice 候选人信息
    struct CandidateInfo {
        bytes16 key;    // 唯一键
        string name;    // 简称
        uint ballot;    // 得票数
    }

    bool public _open;                            // 是否公开
    string private _title;                        // 合约标题
    address private _proposer;                    // 发起人
    bool private _stoped;                         // 是否已停止
    uint private _start;                          // 开始时间
    uint private _end;                            // 结束时间
    uint private _total;                          // 总投票人数
    uint private _done;                           // 已完成人数
    bytes16[] private _candidateKeys;                    // 候选人键数组
    mapping(bytes16 => Candidate) private _candidates;   // 候选人
    mapping(address => Voter) private _voters;           // 投票人

    /// @notice 投票有效
    modifier valid() {
        require(
            !_stoped && block.timestamp>=_start && block.timestamp<=_end,
            "ERR-01: The current time is invalid for poll."
        );
        _;
    }

    /// @notice 仅发起人
    modifier proposerOnly() {
        require(
            msg.sender == _proposer,
            "ERR-02: This operation is only authorized by proposer."
        );
        _;
    }

    /// @notice 候选人存在
    modifier exitCandidate(bytes16 cand) {
        require(
            _candidates[cand].valid,
            "ERR-03: The candidate dose not exist."
        );
        _;
    }

    /// @notice 有投票权限
    modifier votable() {
        require(
            _open || _voters[msg.sender].valid,
            "ERR-04: Do not have voting rights."
        );
        _;
    }

    /// @notice 尚未投票
    modifier didnotVote() {
        require(
            _open || !_voters[msg.sender].voted,
            "ERR-05: The voter already voted."
        );
        _;
    }

    /// @notice 发起人或投票人
    modifier proposerOrVoter() {
        require(
            _open || msg.sender == _proposer || _voters[msg.sender].valid,
            "ERR-06: Do not have access rights."
        );
        _;
    }

    /// @notice 得票事件
    event Elected(bytes16 key, string name, uint ballot);

    /// @notice 投票已终止
    event Stoped();

    /// @notice 构造函数
    /// @param open 是否公开
    /// @param title 投票标题
    /// @param start 投票开始时间
    /// @param end 投票截止时间
    /// @param candKeys 候选人key
    /// @param candNames 候选人名称
    /// @param voters 投票人地址
    constructor(
        bool open,
        string memory title,
        uint start, uint end,
        bytes16[] memory candKeys,
        string[] memory candNames,
        address[] memory voters
    ) {
        _proposer = msg.sender;
        _open = open;
        _title = title;
        _start = start;
        _end = end;
        _stoped = false;
        _total = voters.length;
        _done = 0;
        _candidateKeys = new bytes16[](candKeys.length);
        for (uint i=0; i<candKeys.length; i++) {
            _candidateKeys.push(candKeys[i]);
            _candidates[candKeys[i]] = Candidate({
                key: candKeys[i],
                name: candNames[i],
                ballot: 0,
                valid: true
            });
        }
        for (uint i=0; i<voters.length; i++) {
            _voters[voters[i]] = Voter({
                voted: false,
                valid: true
            });
        }
    }

    /// @notice 投票
    /// @param cand 候选人key
    function vote(bytes16 cand) public valid votable didnotVote exitCandidate(cand) returns(bool success) {
        _done += 1;
        _candidates[cand].ballot += 1;
        _voters[msg.sender].voted = true;
        emit Elected(cand, _candidates[cand].name, _candidates[cand].ballot);
        return (true);
    }

    /// @notice 获取投票的所有信息
    function getPoll() public view proposerOrVoter returns(
        bool open,
        string memory title,
        address proposer,
        bool stoped,
        uint start,
        uint end,
        uint total,
        uint done,
        CandidateInfo[] memory candidates
    ) {
        CandidateInfo[] memory candInfos = new CandidateInfo[](_candidateKeys.length);
        for (uint i=0; i<_candidateKeys.length; i++) {
            candInfos[i] = CandidateInfo({
                key: _candidateKeys[i],
                name: _candidates[_candidateKeys[i]].name,
                ballot: _candidates[_candidateKeys[i]].ballot
            });
        }
        return (
            _open,
            _title,
            _proposer,
            _stoped,
            _start,
            _end,
            _total,
            _done,
            candInfos
        );
    }

    /// @notice 停止投票
    function stop() public valid proposerOnly returns(bool success) {
        _stoped = true;
        emit Stoped();
        return (true);
    }
}