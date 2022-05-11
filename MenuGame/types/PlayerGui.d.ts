interface PlayerGui extends BasePlayerGui {
	Menu: ScreenGui & {
		Main: Frame & {
			Dragon: ImageLabel;
			Title: ImageLabel;
			Options: ImageButton;
			Play: ImageButton;
			Exit: ImageButton;
		};
		Options: Frame;
	};
	LoadScreen: ScreenGui & {
		Loading: TextLabel;
		Background: ImageLabel;
		Wheel: ImageLabel;
	};
}
