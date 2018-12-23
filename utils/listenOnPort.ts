import { Application } from "express";

export function listenOnPort(app: Application, port: number) {

    app.listen(port, (err: Error) => {
        if (err) {
            return console.log(err)
        }

        return console.log(`Server is listening on ${port}`)
    });
}
