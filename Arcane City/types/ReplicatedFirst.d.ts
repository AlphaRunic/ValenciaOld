interface ReplicatedFirst extends Instance {
	Assets: Folder & {
		InteractableMarker: MeshPart;
		QuestHelper: MeshPart & {
			Distance: BillboardGui & {
				Frame: Frame & {
					UIAspectRatioConstraint: UIAspectRatioConstraint;
					Distance: TextLabel;
				};
			};
		};
		UI: Folder & {
			NotificationLabel: TextLabel;
			ShopItem: ViewportFrame & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				Title: TextLabel;
			};
			LoadScreen: ScreenGui & {
				Loading: TextLabel;
				Background: ImageLabel;
				Wheel: ImageLabel;
			};
		};
		ShopItems: Folder & {
			BasicSword: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
		};
		Enemies: Folder & {
			Necromancer: Model & {
				AnimationController: AnimationController & {
					Animator: Animator;
				};
				staff_skull: MeshPart;
				AnimSaves: Model & {
					["Automatic Save"]: KeyframeSequence;
				};
				RootPart: Part & {
					Bip01: Bone & {
						["Bip01 Pelvis"]: Bone & {
							["Bip01 Spine"]: Bone & {
								["Bip01 L Thigh"]: Bone & {
									["Bip01 L Calf"]: Bone & {
										["Bip01 L Foot"]: Bone & {
											["Bip01 L Toe0"]: Bone & {
												["Bip01 L Toe0Nub"]: Bone;
											};
										};
									};
								};
								["Bip01 R Thigh"]: Bone & {
									["Bip01 R Calf"]: Bone & {
										["Bip01 R Foot"]: Bone & {
											["Bip01 R Toe0"]: Bone & {
												["Bip01 R Toe0Nub"]: Bone;
											};
										};
									};
								};
								["Bip01 Spine1"]: Bone & {
									["Bip01 Neck"]: Bone & {
										["Bip01 R Clavicle"]: Bone & {
											["Bip01 R UpperArm"]: Bone & {
												["Bip01 R Forearm"]: Bone & {
													["Bip01 R Hand"]: Bone & {
														["Bip01 R Finger1"]: Bone & {
															["Bip01 R Finger11"]: Bone & {
																["Bip01 R Finger1Nub"]: Bone;
															};
														};
														["Bip01 R Finger0"]: Bone & {
															["Bip01 R Finger01"]: Bone & {
																["Bip01 R Finger0Nub"]: Bone;
															};
														};
													};
												};
											};
										};
										["Bip01 L Clavicle"]: Bone & {
											["Bip01 L UpperArm"]: Bone & {
												["Bip01 L Forearm"]: Bone & {
													["Bip01 L Hand"]: Bone & {
														["Bip01 L Finger0"]: Bone & {
															["Bip01 L Finger01"]: Bone & {
																["Bip01 L Finger0Nub"]: Bone;
															};
														};
														["Bip01 L Finger1"]: Bone & {
															["Bip01 L Finger11"]: Bone & {
																["Bip01 L Finger1Nub"]: Bone;
															};
														};
													};
												};
											};
										};
										["Bip01 Head"]: Bone & {
											["Bip01 HeadNub"]: Bone;
										};
									};
									["Bip01 Xtra01"]: Bone & {
										["Bip01 Xtra02"]: Bone & {
											["Bip01 Xtra03"]: Bone;
										};
									};
								};
							};
						};
					};
				};
				InitialPoses: Folder & {
					["Bip01 L UpperArm_Composited"]: CFrameValue;
					Bone01_Initial: CFrameValue;
					["Bip01 L Foot_Original"]: CFrameValue;
					["Bip01 R Foot_Composited"]: CFrameValue;
					["Bip01 L Finger11_Original"]: CFrameValue;
					["Bip01 R Forearm_Initial"]: CFrameValue;
					Bip01_Original: CFrameValue;
					["Bip01 R Calf_Original"]: CFrameValue;
					["Bip01 L Toe0Nub_Original"]: CFrameValue;
					["Bip01 L UpperArm_Initial"]: CFrameValue;
					["Bip01 Footsteps_Initial"]: CFrameValue;
					["Bip01 L Foot_Composited"]: CFrameValue;
					["Bip01 R Finger11_Composited"]: CFrameValue;
					["Bip01 Neck_Composited"]: CFrameValue;
					["Bip01 Footsteps_Original"]: CFrameValue;
					["Bip01 Head_Composited"]: CFrameValue;
					["Bip01 Footsteps_Composited"]: CFrameValue;
					["Bip01 Xtra02_Composited"]: CFrameValue;
					["Bip01 L Finger1Nub_Initial"]: CFrameValue;
					["Bip01 L Finger0Nub_Initial"]: CFrameValue;
					["Bip01 L Foot_Initial"]: CFrameValue;
					["Bip01 L Finger11_Initial"]: CFrameValue;
					["Bip01 R Finger01_Composited"]: CFrameValue;
					["Bip01 R Finger1Nub_Initial"]: CFrameValue;
					["Bip01 R Toe0_Composited"]: CFrameValue;
					["Bip01 Neck_Original"]: CFrameValue;
					staff_skull_Original: CFrameValue;
					["Bip01 L Finger0_Composited"]: CFrameValue;
					["Bip01 L Hand_Composited"]: CFrameValue;
					["Bip01 L Finger0_Initial"]: CFrameValue;
					["Bip01 R Finger0_Original"]: CFrameValue;
					["Bip01 L Finger0Nub_Composited"]: CFrameValue;
					["Bip01 R Finger1_Composited"]: CFrameValue;
					["Bip01 L Finger0_Original"]: CFrameValue;
					["Bip01 Head_Initial"]: CFrameValue;
					["Bip01 L Finger01_Composited"]: CFrameValue;
					["Bip01 Xtra03_Composited"]: CFrameValue;
					["Bip01 L Toe0Nub_Composited"]: CFrameValue;
					["Bip01 Pelvis_Original"]: CFrameValue;
					["Bip01 Spine_Composited"]: CFrameValue;
					["Bip01 R Toe0Nub_Composited"]: CFrameValue;
					["Bip01 R Clavicle_Original"]: CFrameValue;
					["Bip01 L Finger01_Initial"]: CFrameValue;
					["Bip01 Xtra01_Initial"]: CFrameValue;
					["Bip01 Pelvis_Initial"]: CFrameValue;
					["Bip01 R Calf_Composited"]: CFrameValue;
					["Bip01 Xtra01_Original"]: CFrameValue;
					["Bip01 L Finger1_Initial"]: CFrameValue;
					["Bip01 R Thigh_Initial"]: CFrameValue;
					["Bip01 L Finger1Nub_Original"]: CFrameValue;
					staff_skull_Initial: CFrameValue;
					["Bip01 R Finger11_Initial"]: CFrameValue;
					["Bip01 Spine_Initial"]: CFrameValue;
					["Bip01 L Finger1_Original"]: CFrameValue;
					["Bip01 L Clavicle_Original"]: CFrameValue;
					["Bip01 Xtra03_Initial"]: CFrameValue;
					necromancer_Original: CFrameValue;
					Bone01_Composited: CFrameValue;
					["Bip01 HeadNub_Initial"]: CFrameValue;
					["Bip01 L Finger11_Composited"]: CFrameValue;
					["Bip01 Neck_Initial"]: CFrameValue;
					["Bip01 Xtra01Nub_Original"]: CFrameValue;
					["Bip01 Xtra01Nub_Composited"]: CFrameValue;
					["Bip01 L Toe0_Composited"]: CFrameValue;
					["Bip01 L Calf_Initial"]: CFrameValue;
					["Bip01 Xtra01Nub_Initial"]: CFrameValue;
					["Bip01 L Calf_Composited"]: CFrameValue;
					["Bip01 L Clavicle_Initial"]: CFrameValue;
					["Bip01 L UpperArm_Original"]: CFrameValue;
					["Bip01 L Thigh_Initial"]: CFrameValue;
					["Bip01 L Finger1Nub_Composited"]: CFrameValue;
					["Bip01 L Calf_Original"]: CFrameValue;
					["Bip01 R Toe0_Initial"]: CFrameValue;
					["Bip01 R Clavicle_Initial"]: CFrameValue;
					["Bip01 Xtra02Nub_Initial"]: CFrameValue;
					["Bip01 R Finger1_Original"]: CFrameValue;
					["Bip01 R Hand_Initial"]: CFrameValue;
					["Bip01 R UpperArm_Original"]: CFrameValue;
					["Bip01 R Toe0Nub_Initial"]: CFrameValue;
					["Bip01 L Finger01_Original"]: CFrameValue;
					["Bip01 HeadNub_Original"]: CFrameValue;
					["Bip01 R Finger1Nub_Original"]: CFrameValue;
					["Bip01 R Finger1Nub_Composited"]: CFrameValue;
					["Bip01 Pelvis_Composited"]: CFrameValue;
					["Bip01 R Finger0Nub_Initial"]: CFrameValue;
					["Bip01 Spine_Original"]: CFrameValue;
					["Bip01 Spine1_Original"]: CFrameValue;
					Bip01_Composited: CFrameValue;
					necromancer_Initial: CFrameValue;
					["Bip01 R Toe0Nub_Original"]: CFrameValue;
					["Bip01 Xtra02Nub_Original"]: CFrameValue;
					["Bip01 Xtra01_Composited"]: CFrameValue;
					["Bip01 R Toe0_Original"]: CFrameValue;
					staff_skull_Composited: CFrameValue;
					["Bip01 L Forearm_Original"]: CFrameValue;
					["Bip01 Xtra03Nub_Initial"]: CFrameValue;
					["Bip01 R Foot_Initial"]: CFrameValue;
					["Bip01 Spine1_Composited"]: CFrameValue;
					["Bip01 R Finger01_Original"]: CFrameValue;
					["Bip01 R Foot_Original"]: CFrameValue;
					["Bip01 L Finger0Nub_Original"]: CFrameValue;
					["Bip01 R UpperArm_Initial"]: CFrameValue;
					["Bip01 L Hand_Original"]: CFrameValue;
					["Bip01 R Thigh_Original"]: CFrameValue;
					["Bip01 Head_Original"]: CFrameValue;
					["Bip01 Xtra02_Initial"]: CFrameValue;
					["Bip01 L Hand_Initial"]: CFrameValue;
					["Bip01 L Toe0Nub_Initial"]: CFrameValue;
					["Bip01 R Thigh_Composited"]: CFrameValue;
					["Bip01 L Toe0_Initial"]: CFrameValue;
					["Bip01 R Finger0_Composited"]: CFrameValue;
					["Bip01 HeadNub_Composited"]: CFrameValue;
					["Bip01 R Calf_Initial"]: CFrameValue;
					["Bip01 Xtra02Nub_Composited"]: CFrameValue;
					["Bip01 Xtra03_Original"]: CFrameValue;
					["Bip01 R Finger0Nub_Composited"]: CFrameValue;
					Bone01_Original: CFrameValue;
					["Bip01 R Finger01_Initial"]: CFrameValue;
					["Bip01 L Clavicle_Composited"]: CFrameValue;
					necromancer_Composited: CFrameValue;
					["Bip01 R UpperArm_Composited"]: CFrameValue;
					["Bip01 L Thigh_Composited"]: CFrameValue;
					["Bip01 Xtra03Nub_Composited"]: CFrameValue;
					["Bip01 R Clavicle_Composited"]: CFrameValue;
					["Bip01 R Hand_Composited"]: CFrameValue;
					["Bip01 Spine1_Initial"]: CFrameValue;
					Bip01_Initial: CFrameValue;
					["Bip01 L Thigh_Original"]: CFrameValue;
					["Bip01 R Finger0_Initial"]: CFrameValue;
					["Bip01 R Finger11_Original"]: CFrameValue;
					["Bip01 Xtra03Nub_Original"]: CFrameValue;
					["Bip01 L Finger1_Composited"]: CFrameValue;
					["Bip01 R Finger0Nub_Original"]: CFrameValue;
					["Bip01 L Toe0_Original"]: CFrameValue;
					["Bip01 Xtra02_Original"]: CFrameValue;
					["Bip01 R Forearm_Original"]: CFrameValue;
					["Bip01 R Finger1_Initial"]: CFrameValue;
					["Bip01 L Forearm_Composited"]: CFrameValue;
					["Bip01 L Forearm_Initial"]: CFrameValue;
					["Bip01 R Forearm_Composited"]: CFrameValue;
					["Bip01 R Hand_Original"]: CFrameValue;
				};
				necromancer: MeshPart;
			};
		};
	};
}
