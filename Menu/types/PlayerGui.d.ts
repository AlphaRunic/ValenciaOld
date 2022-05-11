interface PlayerGui extends Instance {
	Menu: ScreenGui & {
		Main: Frame & {
			Exit: ImageButton;
			Title2: ImageLabel;
			Options: ImageButton;
			Title: ImageLabel;
			Play: ImageButton;
		};
	};
	LoadScreen: ScreenGui & {
		Background: ImageLabel;
		Wheel: ImageLabel;
		Loading: TextLabel;
	};
}