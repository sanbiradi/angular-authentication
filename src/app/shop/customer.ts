export default interface customer {
    email: string,
    password: string | undefined,
    name: string,
    address: {
        street: string, 
        addressLine2: string,
        city: string,
        state: string,
        pin: string
    },
    captcha:any
};
