package DabuOps.tikkle.curation_tag.service;

import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.curation.repository.CurationRepository;
import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.curation_tag.repository.TagRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberRole;
import DabuOps.tikkle.member.repository.MemberRepository;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TagService {
    private final TagRepository repository;
    private final CurationRepository curationRepository;
    private final MemberRepository memberRepository;

    public Tag createTag(Tag tag, long memberId){
        verifyAuthorizedMemberForTag(memberId);
        verifyExistTagByName(tag.getName());
        return repository.save(tag);
    }

    public Tag updateTag(Tag tag, long memberId){
        verifyAuthorizedMemberForTag(memberId);

        Tag obtainTag = findExistTagById(tag.getId());

        Optional.ofNullable(tag.getName())
                .ifPresent(obtainTag::setName);

        verifyExistTagByName(obtainTag.getName());

        return repository.save(obtainTag);
    }

    public Tag getTag(long tagId){
        return findExistTagById(tagId);
    }

    public Tag getTagByName(String name){
        return findExistTagByName(name);
    }

    public List<Tag> getTags(){
        return repository.findAll();
    }
    public void deleteTag(long tagId, long memberId){
        verifyAuthorizedMemberForTag(memberId);

        Tag obtainTag = findExistTagById(tagId);

        List<Curation> curations = curationRepository.findAllByTagId(obtainTag.getId());

        for(Curation curation : curations){
            curation.setTag(null);
        }

        curationRepository.saveAll(curations);

        repository.delete(obtainTag);
    }


    private void verifyExistTagByName(String name){
        Optional<Tag> optionalTag = repository.findByName(name);
        if(optionalTag.isPresent())
            throw new BusinessLogicException(ExceptionCode.TAG_EXISTS);
    }
    private Tag findExistTagById(Long tagId){
        Optional<Tag> optionalTag = repository.findById(tagId);

        Tag obtainTag = optionalTag
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return  obtainTag;
    }
    private Tag findExistTagByName(String name){
        Optional<Tag> optionalTag = repository.findByName(name);

        Tag obtainTag = optionalTag
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return  obtainTag;
    }

    /**
     * 사용자가 권한을 가졌는지 확인하는 method
     */
    private void verifyAuthorizedMemberForTag(Long memberId){
        Member obtainMember = memberRepository.findById(memberId).get();
        if(obtainMember.getRole() != MemberRole.CURATOR)
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);

    }

}
