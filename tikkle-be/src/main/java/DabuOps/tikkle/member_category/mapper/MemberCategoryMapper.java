package DabuOps.tikkle.member_category.mapper;

import DabuOps.tikkle.member_category.dto.MemberCategoryDto;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberCategoryMapper {
    MemberCategory memberCategoryPostDtoToMemberCategory(MemberCategoryDto.Post requestBody);

    MemberCategory memberCategoryPatchDtoToMemberCategory(MemberCategoryDto.Patch requestBody);

    MemberCategoryDto.Response memberCategoryToMemberCategoryResponseDto(MemberCategory memberCategory);

    List<MemberCategoryDto.Response> memberCategoriesToMemberCategoryResponseDto(List<MemberCategory> memberCategories);
}
