package DabuOps.tikkle.curation_likes.controller;

import DabuOps.tikkle.curation_likes.service.CurationLikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
public class curationLikesController {
    private final CurationLikesService curationLikesService;

    @PatchMapping("/{member_id}/{curation_id}")
    public ResponseEntity updateLikeUp(@PathVariable("member_id") Long memberId,
                                       @PathVariable("curation_id") Long curationId) {

        curationLikesService.requestLike(memberId, curationId);

        return ResponseEntity.ok().build();
    }
}
