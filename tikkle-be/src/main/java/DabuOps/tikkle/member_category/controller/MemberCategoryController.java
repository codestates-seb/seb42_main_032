package DabuOps.tikkle.member_category.controller;

import DabuOps.tikkle.member_category.dto.MemberCategoryDto;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.mapper.MemberCategoryMapper;
import DabuOps.tikkle.member_category.repogitory.MemberCategoryRepository;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/memberCategories")
public class MemberCategoryController {
    private final MemberCategoryRepository memberCategoryRepository;
    private final MemberCategoryService memberCategoryService;
    private final MemberCategoryMapper mapper;

    @PostMapping("/{member_id}")
    public ResponseEntity postMemberCategory(@PathVariable("member_id") @Positive long memberId,
                                             @Valid @RequestBody MemberCategoryDto.Post requestBody) {
        MemberCategory memberCategory = mapper.memberCategoryPostDtoToMemberCategory(requestBody);
        memberCategoryService.createMemberCategory(memberCategory, memberId);

        return new ResponseEntity<>(memberCategory, HttpStatus.CREATED);
    }

    @PatchMapping("/{member_category_id}")
    public ResponseEntity patchMemberCategory(@PathVariable("member_category_id") long memberCategoryId,
                                              @Valid @RequestBody MemberCategoryDto.Patch requestBody) {
        MemberCategory memberCategory = mapper.memberCategoryPatchDtoToMemberCategory(requestBody);
        memberCategory.setMemberCategoryId(memberCategoryId);
        MemberCategory updatedMemberCategory = memberCategoryService.updateMemberCategory(memberCategory);

        return new ResponseEntity<>(updatedMemberCategory, HttpStatus.OK);
    }

    @GetMapping("/{member_category_id}")
    public ResponseEntity getMemberCategory(@PathVariable("member_category_id") long memberCategoryId) {
        MemberCategory memberCategory = memberCategoryService.findMemberCategory(memberCategoryId);
        MemberCategoryDto.Response response = mapper.memberCategoryToMemberCategoryResponseDto(memberCategory);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{member_id}")
    public ResponseEntity getAllMemberCategories(@PathVariable("member_id") long memberId) {
        List<MemberCategory> memberCategories = memberCategoryService.findAllMemberCategories(memberId);
        List<MemberCategoryDto.Response> responses = mapper.memberCategoriesToMemberCategoryResponseDto(memberCategories);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{member_category_id}")
    public ResponseEntity deleteMemberCategory(@PathVariable("member_category_id") long memberCategoryId) {
        memberCategoryService.deleteMemberCategory(memberCategoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
