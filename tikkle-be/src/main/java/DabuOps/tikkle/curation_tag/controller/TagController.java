package DabuOps.tikkle.curation_tag.controller;


import DabuOps.tikkle.curation_tag.dto.TagDto;
import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.curation_tag.mapper.TagMapper;
import DabuOps.tikkle.curation_tag.service.TagService;
import DabuOps.tikkle.global.utils.ResponseListDto;
import DabuOps.tikkle.global.utils.SingleResponseDto;
import DabuOps.tikkle.global.utils.UriCreator;
import java.net.URI;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;
    private final TagMapper mapper;

    @PostMapping("/{member-id}")
    public ResponseEntity postTag(@RequestBody TagDto.Post post,
        @Positive @PathVariable("member-id") long memberId) {
        Tag tag = tagService.createTag(mapper.postDtoToTag(post), memberId);
        URI location = UriCreator.createURI("/tags", tag.getId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{tag-id}/{member-id}")
    public  ResponseEntity patchTag(
        @Positive @PathVariable("tag-id") long tagId,
        @RequestBody TagDto.Patch patch,
        @Positive @PathVariable("member-id") long memberId){
        Tag tag = mapper.patchDtoToTag(patch);
        tag.setId(tagId);
        tagService.updateTag(tag, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{tag-id}")
    public ResponseEntity getTag(@Positive @PathVariable("tag-id") long tagId){
        Tag tag = tagService.getTag(tagId);
        TagDto.Response response = mapper.tagToResponseDto(tag);
        return  new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getTags(){
        List<Tag> tags = tagService.getTags();
        return new ResponseEntity<>(new ResponseListDto<>(
            mapper.tagsToTagResponses(tags))
        ,HttpStatus.OK);
    }

    @DeleteMapping("/{tag-id}/{member-id}")
    public ResponseEntity deleteTag(@Positive @PathVariable("tag-id") long tagId,
        @Positive @PathVariable("member-id") long memberId){
        tagService.deleteTag(tagId, memberId);
        return ResponseEntity.noContent().build();
    }

}
