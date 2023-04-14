package DabuOps.tikkle.curation.service;

import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.curation.entity.Curation.CurationState;
import DabuOps.tikkle.curation.repository.CurationRepository;
import DabuOps.tikkle.curation_tag.repository.TagRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberRole;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member.service.MemberService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurationService {
    private final CurationRepository repository;
    private final MemberService memberService;

    private final int pageSize = 10;

    public Curation createCuration(Curation curation, Long memberId){
        Member obtainMember = verifyAuthorizedMemberForCuration(memberId);
        curation.setMember(obtainMember);
        curation.setCreatedAt(LocalDateTime.now());
        curation.setModifiedAt(LocalDateTime.now());
        return repository.save(curation);
    }

    public Curation updateCuration(Curation curation, Long memberId){

        Curation obtainCuration = findExistCurationById(curation.getId());
        verifyAuthorizedMemberForCuration(memberId);

        Optional.ofNullable(curation.getTitle())
            .ifPresent(obtainCuration::setTitle);
        Optional.ofNullable(curation.getContent())
            .ifPresent(obtainCuration::setContent);
        Optional.ofNullable(curation.getTag())
            .ifPresent(obtainCuration::setTag);

        obtainCuration.setModifiedAt(LocalDateTime.now());

        return repository.save(obtainCuration);
    }
    public Curation getCuration(Long curationId){
        Curation obtainCuration = findExistCurationById(curationId);
        return obtainCuration;
    }
    public Page<Curation> findCurations(String keyword, int page, int searchType){
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize, Sort.by("modifiedAt").descending());
        Page<Curation> response = null;
        if(searchType == 0) {
            response = repository.findByTitleContainingOrTag_NameContaining(keyword, keyword, pageRequest);
        }
        else if(searchType == 1) {
            response = repository.findByTitleContains(keyword, pageRequest);
        }
        else {
            response = repository.findByTag_NameContaining(keyword, pageRequest);
        }

        return response;
    }

    public Page<Curation> getAllCurations(int page) {
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize, Sort.by("modifiedAt").descending());
        Page<Curation> response = repository.findByStateIsNot(CurationState.DELETED, pageRequest);

        return response;
    }

    public void deleteCuration (Long curationId, Long memberId){
        verifyAuthorizedMemberForCuration(memberId);
        Curation obtainCuration = findExistCurationById(curationId);
        obtainCuration.setState(CurationState.DELETED);
        repository.save(obtainCuration);
    }

    /**
     * Curation이 존재하는지 검증하는 method
     * @param id 큐레이션 식별자
     * @return 찾아낸 큐레이션
     */
    private Curation findExistCurationById(Long id){
        Optional<Curation> optionalCuration = repository.findById(id);

        Curation obtainCuration = optionalCuration
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CURATION_NOT_FOUND));
        return  obtainCuration;
    }
    /**
     * 사용자가 권한을 가졌는지 확인하는 method
     */
    private Member verifyAuthorizedMemberForCuration(Long memberId){
        Member obtainMember = memberService.findExistMemberById(memberId);
        if(obtainMember.getRole() != MemberRole.CURATOR)
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        return obtainMember;
    }
}
