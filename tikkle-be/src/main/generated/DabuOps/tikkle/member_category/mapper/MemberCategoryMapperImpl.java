package DabuOps.tikkle.member_category.mapper;

import DabuOps.tikkle.member_category.dto.MemberCategoryDto;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-12T21:19:08+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberCategoryMapperImpl implements MemberCategoryMapper {

    @Override
    public MemberCategory memberCategoryPostDtoToMemberCategory(MemberCategoryDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        MemberCategory.MemberCategoryBuilder memberCategory = MemberCategory.builder();

        memberCategory.name( requestBody.getName() );

        return memberCategory.build();
    }

    @Override
    public MemberCategory memberCategoryPatchDtoToMemberCategory(MemberCategoryDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        MemberCategory.MemberCategoryBuilder memberCategory = MemberCategory.builder();

        memberCategory.name( requestBody.getName() );

        return memberCategory.build();
    }

    @Override
    public MemberCategoryDto.Response memberCategoryToMemberCategoryResponseDto(MemberCategory memberCategory) {
        if ( memberCategory == null ) {
            return null;
        }

        long memberCategoryId = 0L;
        String name = null;
        long memberId = 0L;
        long categoryId = 0L;

        if ( memberCategory.getMemberCategoryId() != null ) {
            memberCategoryId = memberCategory.getMemberCategoryId();
        }
        name = memberCategory.getName();
        if ( memberCategory.getMemberId() != null ) {
            memberId = memberCategory.getMemberId();
        }
        if ( memberCategory.getCategoryId() != null ) {
            categoryId = memberCategory.getCategoryId();
        }

        LocalDateTime createdAt = null;

        MemberCategoryDto.Response response = new MemberCategoryDto.Response( memberCategoryId, name, memberId, categoryId, createdAt );

        return response;
    }

    @Override
    public List<MemberCategoryDto.Response> memberCategoriesToMemberCategoryResponseDto(List<MemberCategory> memberCategories) {
        if ( memberCategories == null ) {
            return null;
        }

        List<MemberCategoryDto.Response> list = new ArrayList<MemberCategoryDto.Response>( memberCategories.size() );
        for ( MemberCategory memberCategory : memberCategories ) {
            list.add( memberCategoryToMemberCategoryResponseDto( memberCategory ) );
        }

        return list;
    }
}
