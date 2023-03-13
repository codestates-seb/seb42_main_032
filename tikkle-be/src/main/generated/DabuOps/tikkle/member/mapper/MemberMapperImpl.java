package DabuOps.tikkle.member.mapper;

import DabuOps.tikkle.member.dto.MemberDto;
import DabuOps.tikkle.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-12T21:19:08+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member postDtoToMember(MemberDto.Post post) {
        if ( post == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( post.getEmail() );
        member.name( post.getName() );

        return member.build();
    }

    @Override
    public Member patchDtoToMember(MemberDto.Patch patch) {
        if ( patch == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        return member.build();
    }

    @Override
    public MemberDto.Response memberToResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.Response.ResponseBuilder response = MemberDto.Response.builder();

        response.email( member.getEmail() );
        response.name( member.getName() );
        response.location( member.getLocation() );
        response.state( member.getState() );
        response.modifiedAt( member.getModifiedAt() );
        response.gender( member.getGender() );
        response.payDay( member.getPayDay() );
        response.initDate( member.getInitDate() );

        return response.build();
    }

    @Override
    public MemberDto.MeResponse memberToMeResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.MeResponse.MeResponseBuilder meResponse = MemberDto.MeResponse.builder();

        meResponse.email( member.getEmail() );
        meResponse.name( member.getName() );

        return meResponse.build();
    }
}
