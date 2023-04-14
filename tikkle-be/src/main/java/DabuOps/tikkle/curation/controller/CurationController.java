package DabuOps.tikkle.curation.controller;

import DabuOps.tikkle.curation.dto.CurationDto;
import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.curation.mapper.CurationMapper;
import DabuOps.tikkle.curation.service.CurationService;
import DabuOps.tikkle.global.utils.MultiResponseDto;
import DabuOps.tikkle.global.utils.SingleResponseDto;
import DabuOps.tikkle.global.utils.UriCreator;
import java.net.URI;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/curations")
public class CurationController {

    private final CurationService curationService;
    private final CurationMapper mapper;

    @PostMapping("/{member-id}")
    public ResponseEntity postCuration(@RequestBody CurationDto.Post post,
        @Positive @PathVariable("member-id") long memberId){
        Curation curation = curationService.createCuration(mapper.postDtoToCuration(post),
            memberId);
        URI location = UriCreator.createURI("/curations", curation.getId());
        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{curation-id}/{member-id}")
    public ResponseEntity patchCuration(@Positive @PathVariable("curation-id") long curationId,
        @RequestBody CurationDto.Patch patch, @Positive @PathVariable("member-id") long memberId){
        Curation curation = mapper.patchDtoToCuration(patch);
        curation.setId(curationId);
        curationService.updateCuration(curation, memberId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{curation-id}/{member-id}")
    public ResponseEntity likeCuration(@PathVariable("curation-id") Long curationId,
                                       @PathVariable("member-id") Long memberId) {
        curationService.likeCuration(curationId, memberId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{curation-id}")
    public ResponseEntity getCuration(@Positive @PathVariable("curation-id") long curationId){
        Curation curation = curationService.getCuration(curationId);
        CurationDto.Response response = mapper.curationToResponseDto(curation);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCurations(@RequestParam("page") int page,
                                       @RequestParam("keyword") String keyword,
                                       @RequestBody CurationDto.Search requestBody) {
        int searchType = requestBody.getSearchType();
        Page<Curation> curationPage = curationService.findCurations(keyword, page, searchType);
        List<Curation> curations = curationPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        mapper.curationsToCurationResponses(curations), curationPage), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getAllCurations(@RequestParam("page") int page) {
        Page<Curation> curationPage = curationService.getAllCurations(page - 1);
        List<Curation> curations = curationPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        mapper.curationsToCurationResponses(curations), curationPage), HttpStatus.OK);
    }

    @DeleteMapping("/{curation-id}/{member-id}")
    public ResponseEntity deleteCuration(@Positive @PathVariable("curation-id") long curationId,
        @Positive @PathVariable("member-id") long memberId){
        curationService.deleteCuration(curationId, memberId);
        return ResponseEntity.noContent().build();
    }



}
