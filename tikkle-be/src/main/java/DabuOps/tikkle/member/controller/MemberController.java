package DabuOps.tikkle.member.controller;

import DabuOps.tikkle.global.utils.SingleResponseDto;
import DabuOps.tikkle.global.utils.UriCreator;
import DabuOps.tikkle.member.dto.MemberDto;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.mapper.MemberMapper;
import DabuOps.tikkle.member.service.MemberService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity postMember(@RequestBody MemberDto.Post post){
        Member member = memberService.createMember(mapper.postDtoToMember(post));
        URI location = UriCreator.createURI("/members", member.getId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
        @PathVariable("member-id") long memberId,
        @RequestBody MemberDto.Patch patch){

        Member member = mapper.patchDtoToMember(patch);
        member.setId(memberId);
        memberService.updateMember(member);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
        @PathVariable("member-id") long memberId) {

        Member member = memberService.getMember(memberId);
        MemberDto.Response response = mapper.memberToResponseDto(member);

        return new ResponseEntity(
            new SingleResponseDto<>(response),
            HttpStatus.OK);
    }


    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
        @PathVariable("member-id") long memberId) {

        memberService.deleteMember(memberId);
        return ResponseEntity.noContent().build();
    }



}
