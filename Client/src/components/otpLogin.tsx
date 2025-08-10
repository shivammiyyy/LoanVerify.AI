"use client"

import {auth} from "../libs/firebase";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, {FormEvent, use, useEffect, useState, useTransition} from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "./ui/input-otp";

import {Input} from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function OtpLogin(){
    const [ phoneNumber, setPhoneNumber] = useState("");
    const [otp,setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState("");
    const [resendCountdown, setResendCountdown ] = useState(0);

    const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    
    const  [isPending,startTransition] = useTransition();

    useEffect(()=>{
        let timer: NodeJS.Timeout;
        if(resendCountdown > 0){
            timer = setTimeout(()=> setResendCountdown(resendCountdown-1),1000);
        }
        return ()=>clearTimeout(timer);

    }, [resendCountdown]);

    return()

}
