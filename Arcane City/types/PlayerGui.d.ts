interface PlayerGui extends Instance {
	Main: ScreenGui & {
		Game: Frame & {
			UIPadding: UIPadding;
			Arrow: Frame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Distance: TextLabel;
			}
			Coins: Frame & {
				Icon: ImageLabel;
				Value: TextLabel;
				Add: TextButton & {
					UIAspectRatioConstraint: UIAspectRatioConstraint;
					UICorner: UICorner;
				};
			};
			Gems: Frame & {
				Icon: ImageLabel;
				Value: TextLabel;
				Add: TextButton & {
					UIAspectRatioConstraint: UIAspectRatioConstraint;
					UICorner: UICorner;
				};
			};
			Stats: Frame & {
				List: Frame & {
					UIGridLayout: UIGridLayout;
					Health: TextLabel;
					Damage: TextLabel;
					Resist: TextLabel;
				};
				Title: TextLabel;
			};
			XP: ImageLabel & {
				Bar: ImageLabel & {
					UICorner: UICorner;
				}
			};
			Level: TextLabel & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
			};
			QuestInstructions: TextLabel;
		};
		Interactions: Frame & {
			Shop: Frame & {
				ItemDisplay: Frame & {
					Shadow: Frame & {
						Purchase: TextButton & {
							UICorner: UICorner;
							UIGradient: UIGradient;
						};
						ItemIcon: ViewportFrame & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UICorner: UICorner;
							Price: TextLabel;
						};
						Description: TextLabel;
					};
				};
				Window: Frame & {
					List: ScrollingFrame & {
						UIGridLayout: UIGridLayout;
						UIPadding: UIPadding;
					};
					Close: TextButton & {
						UIAspectRatioConstraint: UIAspectRatioConstraint;
					};
					Title: TextLabel;
				};
			};
			NotificationCenter: Frame & {
				UIListLayout: UIListLayout;
			};
			Dialogue: Frame & {
				UICorner: UICorner;
				UIGradient: UIGradient;
				Next: TextButton & {
					UICorner: UICorner;
				};
				Content: TextLabel & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
				Speaker: TextLabel;
			}
		};
		Debug: Frame & {
			Memory: TextLabel;
			DataSend: TextLabel;
			DataReceive: TextLabel;
			Heartbeat: TextLabel;
			FPS: TextLabel;
		};
	};
	LoadScreen: ScreenGui & {
		Background: ImageLabel;
		Wheel: ImageLabel;
		Loading: TextLabel;
	};
}
