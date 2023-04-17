package DabuOps.tikkle.curation_like_up.service;

import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.curation.repository.CurationRepository;
import DabuOps.tikkle.curation.service.CurationService;
import DabuOps.tikkle.curation_like_up.entity.CurationLikeUp;
import DabuOps.tikkle.curation_like_up.repository.CurationLikeUpRepository;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CurationLikeUpService {
    private final CurationLikeUpRepository curationLikeUpRepository;
    private final MemberService memberService;
    private final CurationService curationService;

    public void requestLike(Long memberId, Long curationId) {
        Member member = memberService.findExistMemberById(memberId);
        Curation curation = curationService.getCuration(curationId);

        if(curationLikeUpRepository.findByMemberIdAndCurationId(memberId, curationId).isPresent()) {
            curationLikeUpRepository.delete(curationLikeUpRepository.findByMemberIdAndCurationId(memberId, curationId).get());
        }
        else {
            CurationLikeUp likeUp = CurationLikeUp.builder()
                    .member(member)
                    .curation(curation)
                    .build();
            curationLikeUpRepository.save(likeUp);
        }
    }
}
