package DabuOps.tikkle.curation_likes.service;

import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.curation.repository.CurationRepository;
import DabuOps.tikkle.curation.service.CurationService;
import DabuOps.tikkle.curation_likes.entity.CurationLikes;
import DabuOps.tikkle.curation_likes.repository.CurationLikesRepository;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CurationLikesService {
    private final CurationLikesRepository curationLikesRepository;
    private final CurationRepository curationRepository;
    private final MemberService memberService;
    private final CurationService curationService;

    public void requestLike(Long memberId, Long curationId) {
        Member member = memberService.findExistMemberById(memberId);
        Curation curation = curationService.getCuration(curationId);

        if(curationLikesRepository.findByMemberIdAndCurationId(memberId, curationId).isPresent()) {
            curationLikesRepository.delete(curationLikesRepository.findByMemberIdAndCurationId(memberId, curationId).get());
            curation.setLikesCount(curation.getLikesCount() - 1);
        }
        else {
            CurationLikes likeUp = CurationLikes.builder()
                    .member(member)
                    .curation(curation)
                    .build();
            curationLikesRepository.save(likeUp);
            curation.setLikesCount(curation.getLikesCount() + 1);
        }

        curationRepository.save(curation);
    }
}
