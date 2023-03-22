package DabuOps.tikkle.member.mapper;

import DabuOps.tikkle.member.dto.MemberDto;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberState;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member postDtoToMember(MemberDto.Post post);

    Member patchDtoToMember(MemberDto.Patch patch);

    MemberDto.Response memberToResponseDto(Member member);

    MemberDto.MeResponse memberToMeResponseDto(Member member);

}
