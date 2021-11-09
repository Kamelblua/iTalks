import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

class Auth {
	base_url: string = process.env.REACT_APP_SERVER_URL + "/api";
	token: string = Cookies.get("token")!;

	isAuthenticated() {
		return typeof this.token !== "undefined";
	}

	isUnauthenticated() {
		return typeof this.token === "undefined";
	}

	decodedToken(): any {
		var decoded = jwt_decode(this.token);

		return decoded;
	}

	getUserId(): number {
		return this.decodedToken()["uid"];
	}

	getUsername(): string {
		return this.decodedToken()["username"];
	}

	getAvatarLink(): string {
		return this.decodedToken()["avatar"];
	}

	isAdmin() {
		if (this.isUnauthenticated()) {
			return false;
		}

		if (this.decodedToken().role !== "admin") return false;
		return true;
	}
}

export default new Auth();
