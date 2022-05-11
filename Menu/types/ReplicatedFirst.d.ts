interface ReplicatedFirst extends Instance {
	Assets: Folder & {
		LoadScreen: ScreenGui & {
			Loading: TextLabel;
			Background: ImageLabel;
			Wheel: ImageLabel;
		};
	};
}
