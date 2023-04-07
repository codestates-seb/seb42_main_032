package DabuOps.tikkle.curation.controller;

import DabuOps.tikkle.curation.dto.CurationDto;
import DabuOps.tikkle.curation.entity.Curation;
import DabuOps.tikkle.curation.mapper.CurationMapper;
import DabuOps.tikkle.curation.repository.CurationRepository;
import DabuOps.tikkle.curation.service.CurationService;
import DabuOps.tikkle.global.utils.MultiResponseDto;
import DabuOps.tikkle.global.utils.ResponseListDto;
import DabuOps.tikkle.global.utils.SingleResponseDto;
import DabuOps.tikkle.global.utils.UriCreator;
import DabuOps.tikkle.oauth.dto.LogInMemberDto;
import DabuOps.tikkle.oauth.resolver.LoginMember;
import java.net.URI;
import java.util.List;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
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

    @PostMapping
    public ResponseEntity postCuration(@RequestBody CurationDto.Post post,
        @LoginMember LogInMemberDto logInMemberDto){
        Curation curation = curationService.createCuration(mapper.postDtoToCuration(post),
            logInMemberDto.getMemberId());
        URI location = UriCreator.createURI("/curations", curation.getId());
        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{curation-id}")
    public ResponseEntity patchCuration(@Positive @PathVariable("curation-id") long curationId,
        @RequestBody CurationDto.Patch patch, @LoginMember LogInMemberDto logInMemberDto){
        Curation curation = mapper.patchDtoToCuration(patch);
        curation.setId(curationId);
        curationService.updateCuration(curation, logInMemberDto.getMemberId());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/{curation-id}")
    public ResponseEntity getCuration(@Positive @PathVariable("curation-id") long curationId){
        Curation curation = curationService.getCuration(curationId);
        CurationDto.Response response = mapper.curationToResponseDto(curation);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{tag-id}")
    public ResponseEntity getCurationsByTagId(
        @Positive @PathVariable("tag-id") long tagId, @Positive @RequestParam int page){
        Page<Curation> curationPage = curationService.getCurations(tagId, page);
        List<Curation> curations = curationPage.getContent();
        return new ResponseEntity<>(
            new MultiResponseDto<>(
                mapper.curationsToCurationResponses(curations), curationPage), HttpStatus.OK);
    }

    @DeleteMapping("/{curation-id}")
    public ResponseEntity deleteCuration(@Positive @PathVariable("curation-id") long curationId,
        @LoginMember LogInMemberDto logInMemberDto){
        curationService.deleteCuration(curationId, logInMemberDto.getMemberId());
        return ResponseEntity.noContent().build();
    }



}
