package kr.co.skcc.netzero.auth.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.skcc.netzero.auth.vo.UserMst;

@Mapper
public interface UserMstDao {
    public Optional<UserMst> getUser(@Param("username") String username);
}
