package DabuOps.tikkle.curation_tag.service;

import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.curation_tag.repository.TagRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.repository.MemberRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TagService {
    private final TagRepository repository;

    private final MemberRepository memberRepository;

    private Tag findExistCurationById(Long tagId){
        Optional<Tag> optionalTag = repository.findById(tagId);

        Tag obtainTag = optionalTag
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return  obtainTag;
    }

}
