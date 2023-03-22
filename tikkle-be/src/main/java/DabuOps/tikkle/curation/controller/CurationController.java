package DabuOps.tikkle.curation.controller;

import DabuOps.tikkle.curation.mapper.CurationMapper;
import DabuOps.tikkle.curation.repository.CurationRepository;
import DabuOps.tikkle.curation.service.CurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/curations")
public class CurationController {

    private final CurationService curationService;
    private final CurationMapper mapper;


}
