package DabuOps.tikkle.curation.mapper;

import DabuOps.tikkle.curation.dto.CurationDto;
import DabuOps.tikkle.curation.dto.CurationDto.Response;
import DabuOps.tikkle.curation.entity.Curation;
import java.util.List;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CurationMapper {
    @Mapping(source = "tagId", target = "tag.id")
    Curation postDtoToCuration(CurationDto.Post post);
    @Mapping(source = "tagId", target = "tag.id")
    Curation patchDtoToCuration(CurationDto.Patch patch);
    @Named("CTR")
    @Mapping(source = "tag.id", target = "tagId")
    @Mapping(source = "member.name", target = "memberName")
    CurationDto.Response curationToResponseDto(Curation curation);
    @IterableMapping(qualifiedByName = "CTR")
    List<CurationDto.Response> curationsToCurationResponses(List<Curation> curations);

}
