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
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurationService {
    private final CurationRepository repository;
    private final MemberRepository memberRepository;

    public Curation createCuration(Curation curation, Long memberId){
        verifyAuthorizedMemberForCuration(memberId);
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

        return repository.save(obtainCuration);
    }
    public Curation getCuration(Long curationId){
        Curation obtainCuration = findExistCurationById(curationId);
        return obtainCuration;
    }
    public List<Curation> getCurations(Long tagId){
        List<Curation> curations =  repository.findAllByTagId(tagId);
        return curations;
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
    private void verifyAuthorizedMemberForCuration(Long memberId){
        Member obtainMember = memberRepository.findById(memberId).get();
        if(obtainMember.getRole() != MemberRole.curator)
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);

    }
}
