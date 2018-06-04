class User {
    firstName: string;
    lastName: string;
}

export class Cv {
    title: string;
    user: User;

    constructor() {
        this.user = new User();
    }
}

export class CvBuilder {
    cv: Cv;

    constructor() {
        this.cv = new Cv();
    }

    setCvTitle(title: string): CvBuilder {
        this.cv.title = title;
        return this;
    }

    setUserFirstName(firstName: string): CvBuilder {
        this.cv.user.firstName = firstName;
        return this;
    }

    setUserLastName(lastName: string): CvBuilder {
        this.cv.user.lastName = lastName;
        return this;
    }

    build(): Cv {
        return this.cv;
    }
}
