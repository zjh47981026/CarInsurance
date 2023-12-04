package com.synergisticit.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WelcomeController {
    @RequestMapping(value ="/home", method = RequestMethod.GET)
    public String welcome(Model model, HttpServletRequest request) {
        boolean isAuthenticated = checkUserAuthentication(request);
        model.addAttribute("isAuthenticated", isAuthenticated);
        return "Home";
    }

    private boolean checkUserAuthentication(HttpServletRequest request) {
        return request.getSession().getAttribute("authToken") != null;
    }

    @RequestMapping(value ="/quote", method = RequestMethod.GET)
    public String getAQuote() {
        return "quote";
    }


    @RequestMapping(value ="/coverage", method = RequestMethod.GET)
    public String getCoverage() {
        return "coverage";
    }

    @RequestMapping(value ="/claim", method = RequestMethod.GET)
    public String getClaim() {
        return "claim";
    }

    @RequestMapping(value ="/contact", method = RequestMethod.GET)
    public String getContact() {
        return "contact";
    }

    @RequestMapping(value ="/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value ="/value", method = RequestMethod.GET)
    public String getValue() {
        return "value";
    }

    @RequestMapping(value ="/policy", method = RequestMethod.GET)
    public String getPolicy() {
        return "policy";
    }

    @RequestMapping(value ="/claimReview", method = RequestMethod.GET)
    public String getClaimReview() {
        return "claimReview";
    }
}
