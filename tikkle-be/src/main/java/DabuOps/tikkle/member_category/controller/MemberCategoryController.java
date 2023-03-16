package DabuOps.tikkle.member_category.controller;

import DabuOps.tikkle.global.utils.MultiResponseDto;
import DabuOps.tikkle.global.utils.ResponseListDto;
import DabuOps.tikkle.global.utils.SingleResponseDto;
import DabuOps.tikkle.global.utils.UriCreator;
import DabuOps.tikkle.member_category.dto.MemberCategoryDto;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.mapper.MemberCategoryMapper;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/categories")
public class MemberCategoryController {
    private final String DEFAULT_URL = "/categories";
    private final MemberCategoryService memberCategoryService;
    private final MemberCategoryMapper mapper;

    @PostMapping("/{member_id}")
    public ResponseEntity postMemberCategory(@PathVariable("member_id") @Positive Long memberId,
                                             @Valid @RequestBody MemberCategoryDto.Post requestBody) {
        MemberCategory memberCategory = mapper.memberCategoryPostDtoToMemberCategory(requestBody);
        MemberCategory createdMemberCategory = memberCategoryService.createMemberCategory(memberCategory, memberId);

        URI location = UriCreator.createURI(DEFAULT_URL + "/1", 1L);

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member_category_id}")
    public ResponseEntity patchMemberCategory(@PathVariable("member_category_id") Long memberCategoryId,
                                              @Valid @RequestBody MemberCategoryDto.Patch requestBody) {
        MemberCategory memberCategory = mapper.memberCategoryPatchDtoToMemberCategory(requestBody);
        MemberCategory updatedMemberCategory = memberCategoryService.updateMemberCategory(memberCategory, memberCategoryId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/members/{member_category_id}")
    public ResponseEntity getMemberCategory(//@PathVariable("member_id") long memberId,
                                            @PathVariable("member_category_id") Long memberCategoryId) {
        MemberCategory memberCategory = memberCategoryService.findMemberCategory(memberCategoryId);
        MemberCategoryDto.Response response = mapper.memberCategoryToMemberCategoryResponseDto(memberCategory);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{member_id}")
    public ResponseEntity getAllMemberCategories(@PathVariable("member_id") Long memberId) {
        List<MemberCategory> memberCategories = memberCategoryService.findAllMemberCategories(memberId);
        List<MemberCategoryDto.Response> responses = mapper.memberCategoriesToMemberCategoryResponseDto(memberCategories);

        return new ResponseEntity(new ResponseListDto<>(responses), HttpStatus.OK);
    }

    @DeleteMapping("/{member_category_id}")
    public ResponseEntity deleteMemberCategory(@PathVariable("member_category_id") Long memberCategoryId) {
        memberCategoryService.deleteMemberCategory(memberCategoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
