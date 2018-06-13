import { Project } from '../../cv-project/project';

class User {
    firstName: string;
    lastName: string;
}

export class Cv {
    title: string;
    user: User;
    projects: Project[];

    constructor() {
        this.user = new User();
        this.projects = [];
    }

    getProjects(): Project[] {
        return this.projects;
    }

    getCvTitle() {
        return this.title;
    }

    getUserFirstName() {
        return this.user.firstName;
    }

    getUserLastName() {
        return this.user.lastName;
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

    addOrUpdateProject(project: Project): CvBuilder {
        const index = project.getId() && this.cv.projects.findIndex((proj) => proj.getId() === project.getId());

        // Add or update an existing one
        if (index !== -1) {
            this.cv.projects[index] = project;
        } else {
            this.cv.projects.push(project);
        }

        return this;
    }

    build(): Cv {
        return this.cv;
    }
}
