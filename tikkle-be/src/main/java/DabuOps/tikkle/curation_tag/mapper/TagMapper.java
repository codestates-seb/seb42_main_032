package DabuOps.tikkle.curation_tag.mapper;

import DabuOps.tikkle.curation_tag.dto.TagDto;
import DabuOps.tikkle.curation_tag.dto.TagDto.Response;
import DabuOps.tikkle.curation_tag.entity.Tag;
import java.util.List;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface TagMapper {

    Tag postDtoToTag(TagDto.Post post);
    Tag patchDtoToTag(TagDto.Patch patch);
    @Named("TTR")
    TagDto.Response tagToResponseDto(Tag tag);
    @IterableMapping(qualifiedByName = "TTR")
    List<Response> tagsToTagResponses(List<Tag> tags);
}
