export class Project {
    _id: String;
    title: String;
    // When did the project start
    start: Date;
    // When did it end
    end: Date;
    description: String;

    getId(): String {
        return this._id;
    }

    setId(id: String) {
        this._id = id;
    }
}
