package DabuOps.tikkle.member.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.repository.BudgetRepository;
import DabuOps.tikkle.budget.service.BudgetService;
import DabuOps.tikkle.category.CategoryService;
import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.category.repository.CategoryRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberState;
import DabuOps.tikkle.member.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.persistence.PrePersist;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final MemberCategoryService memberCategoryService;
    private final BudgetService budgetService;
    private final BudgetRepository budgetRepository;

    @Override
    public Member createMember(Member member) {
        // 동일한 이메일이 존재하는지 확인.
        verifyExistEmail(member.getEmail());
        member.setPicture("이미지");
        member.setMemberCategories(new ArrayList<>());
        Member savedMember = memberRepository.save(member);

        // Category 리스트 가져오기
        List<Category> categories = categoryRepository.findAll();

        for(Category category : categories) {
            MemberCategory memberCategory = memberCategoryService.createAutoMemberCategory(member, category);
            budgetService.createAutoBudget(memberCategory);
            savedMember.getMemberCategories().add(memberCategory);
        }

        return savedMember;
    }


    public Member createMemberByOauth2(Member member) {
        // 동일한 이메일이 존재하는지 확인.
        Optional<Member> optionalMember = memberRepository.findByEmailAndStateIs(member.getEmail(), MemberState.ACTIVE);

        // Optional Member에 값이 존재하다면 예외 발생.
        if (optionalMember.isPresent())
            return optionalMember.get();

        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member) {
        // 변경할 회원 정보가 존재하는지 검증.
        Member obtainedMember = findExistMemberById(member.getId());

        // member의 값이 비어있지 않으면 obtainedMember의 값을 변경.
        Optional.ofNullable(member.getName())
            .ifPresent(obtainedMember::setName);
        Optional.ofNullable(member.getLocation())
            .ifPresent(obtainedMember::setLocation);
        Optional.ofNullable(member.getPayDay())
            .ifPresent(obtainedMember::setPayDay);
        Optional.ofNullable(member.getInitDate())
            .ifPresent(obtainedMember::setInitDate);

        return memberRepository.save(obtainedMember);
    }

    @Override
    public Member getMember(Long memberId) {

        return findExistMemberById(memberId);
    }

    @Override
    public Member getMember(String email) {

        return findExistMemberByEmail(email);
    }

    @Override
    public void deleteMember(Long memberId) {
        Member obtainedMember = findExistMemberById(memberId);

        // 탈퇴 상태로 변경.
        obtainedMember.setState(MemberState.DELETED);

        memberRepository.save(obtainedMember);
    }

    @Override
    public void verifyExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmailAndStateIs(email, MemberState.ACTIVE);

        // Optional Member에 값이 존재하다면 예외 발생.
        if (optionalMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
    }

    @Override
    public Member findExistMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findByIdAndStateIs(memberId, MemberState.ACTIVE);

        // Optional Member에 값이 존재하지 않다면 예외 발생.
        Member obtainedMember = optionalMember
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return obtainedMember;
    }

    @Override
    public Member findExistMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmailAndStateIs(email, MemberState.ACTIVE);

        // Optional Member에 값이 존재하지 않다면 예외 발생.
        Member obtainedMember = optionalMember
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return obtainedMember;
    }



}
