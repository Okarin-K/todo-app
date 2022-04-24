import { NextFunction, Request, Response } from 'express';
import { auth } from 'firebase-admin';

export async function verifyIdToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const idToken = req.get('X-FBUser-Token');
    if (idToken == undefined) {
        console.log('not login user...');
        res.status(401).send('Please login');
        return;
    }

    console.log(`トークン: ${idToken}`);

    try {
        const decordedToken = await auth().verifyIdToken(idToken);
        console.log(decordedToken);
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('System error');
    }
}
