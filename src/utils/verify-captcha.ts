export async function verifyHcaptcha(token: string):Promise<boolean>{
    const response = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers:{'content-Type': 'application/x-www-form-urlencoded'},
        body:`secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${token}`
    });
    const data = await response.json();
    return data.success ?? false;
}