interface Workspace extends Model {
	EnemyStorage: Folder & {
		["Dark Alley"]: Folder;
	};
	Camera: Camera;
	Baseplate: Part & {
		Texture: Texture;
	};
	Scenery: Folder & {
		OldManHouse: Model & {
			CommonEntrance: MeshPart & {
				Exit: ObjectValue;
			};
			Interior: Model & {
				Lamp: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
					PointLight: PointLight;
					RopeConstraint: RopeConstraint;
					Attachment0: Attachment;
				};
				Roof: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
					Attachment1: Attachment;
				};
				Floor: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
				};
				CornerPosts: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
				};
				CommonEntrance: MeshPart & {
					Exit: ObjectValue;
				};
				Walls: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
				};
			};
			House: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
		};
		ShopStand: MeshPart & {
			SurfaceAppearance: SurfaceAppearance;
		};
		["Meshes/uploads_files_1924595_tree"]: MeshPart & {
			SurfaceAppearance: SurfaceAppearance;
		};
		["Meshes/Wooden_Barrel"]: MeshPart & {
			SurfaceAppearance: SurfaceAppearance;
		};
	};
	EnemySpawns: Folder & {
		["Dark Alley"]: Folder & {
			Spawner: Part & {
				Enemies: Folder & {
					Necromancer: Configuration;
				};
			};
		};
	};
	QuestGoals: Folder & {
		Crystal: MeshPart & {
			SurfaceAppearance: SurfaceAppearance;
			PointLight: PointLight;
		};
		Shop: Part;
		Tunnels: Folder & {
			DarkAlleyExit: Model & {
				CommonEntrance: Part & {
					Exit: ObjectValue;
				};
				Gate: UnionOperation;
			};
			DarkAlleyEntrance: Model & {
				CommonEntrance: Part & {
					Exit: ObjectValue;
				};
				Gate: UnionOperation;
			};
		};
		NPCs: Folder & {
			OldMan: Model & {
				AnimationController: AnimationController & {
					Animator: Animator;
				};
				AnimSaves: Model & {
					["Automatic Save"]: KeyframeSequence;
				};
				Dialogue: Configuration;
				Wizard: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
					Hips: Bone & {
						Thigh_L: Bone & {
							Shin_L: Bone & {
								Foot_L: Bone & {
									FootFingers_L: Bone;
								};
							};
						};
						Spine: Bone & {
							Chest: Bone & {
								Upperarm_L: Bone & {
									Forearm_L: Bone & {
										Hand_L: Bone & {
											Pinky01_L: Bone & {
												Pinky02_L: Bone & {
													Pinky03_L: Bone;
												};
											};
											Index01_L: Bone & {
												Index02_L: Bone & {
													Index03_L: Bone;
												};
											};
											Thumb01_L: Bone & {
												Thumb02_L: Bone & {
													Thumb03_L: Bone;
												};
											};
											Ring01_L: Bone & {
												Ring02_L: Bone & {
													Ring03_L: Bone;
												};
											};
											Middle01_L: Bone & {
												Middle02_L: Bone & {
													Middle03_L: Bone;
												};
											};
										};
									};
								};
								Neck: Bone & {
									Head: Bone & {
										Eye_R: Bone;
										Eye_L: Bone;
									};
								};
								Upperarm_R: Bone & {
									Forearm_R: Bone & {
										Hand_R: Bone & {
											Ring01_R: Bone & {
												Ring02_R: Bone & {
													Ring03_R: Bone;
												};
											};
											Pinky01_R: Bone & {
												Pinky02_R: Bone & {
													Pinky03_R: Bone;
												};
											};
											Middle01_R: Bone & {
												Middle02_R: Bone & {
													Middle03_R: Bone;
												};
											};
											Index01_R: Bone & {
												Index02_R: Bone & {
													Index03_R: Bone;
												};
											};
											Thumb01_R: Bone & {
												Thumb02_R: Bone & {
													Thumb03_R: Bone;
												};
											};
										};
									};
								};
							};
						};
						Thigh_R: Bone & {
							Shin_R: Bone & {
								Foot_R: Bone & {
									FootFingers_R: Bone;
								};
							};
						};
					};
				};
				InitialPoses: Folder & {
					Shin_L_Initial: CFrameValue;
					Index01_R_Initial: CFrameValue;
					HandTarget_R_end_Initial: CFrameValue;
					Chest_Composited: CFrameValue;
					Thigh_L_Initial: CFrameValue;
					Middle01_L_Initial: CFrameValue;
					Ring03_L_Initial: CFrameValue;
					Middle03_R_Composited: CFrameValue;
					Middle02_R_Composited: CFrameValue;
					LegTarget_L_end_Initial: CFrameValue;
					Pinky02_L_Composited: CFrameValue;
					Spine_Original: CFrameValue;
					Thumb03_R_end_Initial: CFrameValue;
					Upperarm_L_Composited: CFrameValue;
					Pinky02_L_Original: CFrameValue;
					Hips_Original: CFrameValue;
					Thumb03_L_Original: CFrameValue;
					StickBone_end_Composited: CFrameValue;
					Index03_R_end_Original: CFrameValue;
					Spine_Initial: CFrameValue;
					Hand_L_Initial: CFrameValue;
					Thigh_R_Original: CFrameValue;
					Thumb02_L_Initial: CFrameValue;
					Eye_R_Composited: CFrameValue;
					Index03_L_Composited: CFrameValue;
					LegTarget_L_end_Original: CFrameValue;
					Wizard_Initial: CFrameValue;
					Head_Composited: CFrameValue;
					Chest_Initial: CFrameValue;
					Index01_L_Original: CFrameValue;
					Hand_R_Composited: CFrameValue;
					HandTarget_R_Composited: CFrameValue;
					Pinky01_R_Composited: CFrameValue;
					Thumb01_L_Initial: CFrameValue;
					Wizard_Original: CFrameValue;
					Index03_L_Original: CFrameValue;
					Eye_R_end_Initial: CFrameValue;
					Wizard_Composited: CFrameValue;
					Pinky01_L_Original: CFrameValue;
					Thumb03_L_end_Composited: CFrameValue;
					Index03_R_Initial: CFrameValue;
					HandTarget_R_end_Composited: CFrameValue;
					Middle02_L_Initial: CFrameValue;
					Spine_Composited: CFrameValue;
					HandTarget_R_Initial: CFrameValue;
					Index03_L_Initial: CFrameValue;
					LegTarget_L_Original: CFrameValue;
					Thumb03_L_end_Initial: CFrameValue;
					HandTarget_R_Original: CFrameValue;
					Ring02_L_Original: CFrameValue;
					Thumb03_R_end_Original: CFrameValue;
					Index03_R_Original: CFrameValue;
					HandTargetParent_R_end_Original: CFrameValue;
					Forearm_R_Initial: CFrameValue;
					HandTargetParent_R_end_Composited: CFrameValue;
					Foot_R_Composited: CFrameValue;
					Index02_L_Original: CFrameValue;
					HandTargetParent_R_Initial: CFrameValue;
					Thumb03_R_end_Composited: CFrameValue;
					Thumb03_L_end_Original: CFrameValue;
					HandTargetParent_R_Original: CFrameValue;
					HandTargetParent_R_Composited: CFrameValue;
					LegTarget_R_end_Composited: CFrameValue;
					Ring03_R_end_Initial: CFrameValue;
					Ring02_L_Composited: CFrameValue;
					Shin_R_Original: CFrameValue;
					LegTarget_L_Composited: CFrameValue;
					Pinky02_R_Original: CFrameValue;
					Middle03_L_Original: CFrameValue;
					FootFingers_L_Initial: CFrameValue;
					LegTarget_R_end_Original: CFrameValue;
					Index02_R_Initial: CFrameValue;
					LegTarget_L_end_Composited: CFrameValue;
					LegTarget_R_Initial: CFrameValue;
					Index02_L_Composited: CFrameValue;
					Forearm_L_Composited: CFrameValue;
					LegTarget_R_Composited: CFrameValue;
					Ring01_L_Original: CFrameValue;
					FootFingers_R_end_Original: CFrameValue;
					Ring02_R_Composited: CFrameValue;
					Ring02_R_Initial: CFrameValue;
					FootFingers_R_end_Composited: CFrameValue;
					Ring03_L_Original: CFrameValue;
					Pinky03_L_Original: CFrameValue;
					FootFingers_R_Initial: CFrameValue;
					FootFingers_R_Original: CFrameValue;
					FootFingers_R_Composited: CFrameValue;
					Pinky03_R_end_Original: CFrameValue;
					Eye_R_end_Original: CFrameValue;
					Middle02_R_Initial: CFrameValue;
					Thumb03_R_Original: CFrameValue;
					Hips_Composited: CFrameValue;
					FootFingers_L_Original: CFrameValue;
					Index01_R_Composited: CFrameValue;
					Shin_R_Initial: CFrameValue;
					Middle03_R_Original: CFrameValue;
					Pinky03_R_Original: CFrameValue;
					LegTarget_L_Initial: CFrameValue;
					Shin_R_Composited: CFrameValue;
					Thigh_R_Initial: CFrameValue;
					FootFingers_L_end_Composited: CFrameValue;
					Index02_R_Original: CFrameValue;
					Thigh_R_Composited: CFrameValue;
					Head_Original: CFrameValue;
					Thumb02_R_Original: CFrameValue;
					Hand_L_Original: CFrameValue;
					Pinky03_L_Initial: CFrameValue;
					Thumb01_R_Composited: CFrameValue;
					Ring01_L_Composited: CFrameValue;
					StickBone_Original: CFrameValue;
					Thumb01_R_Initial: CFrameValue;
					FootFingers_L_end_Initial: CFrameValue;
					WizardRig_Initial: CFrameValue;
					FootFingers_L_end_Original: CFrameValue;
					Middle03_L_end_Initial: CFrameValue;
					Index02_R_Composited: CFrameValue;
					Middle01_R_Initial: CFrameValue;
					Middle03_L_Initial: CFrameValue;
					Middle03_R_Initial: CFrameValue;
					Hand_L_Composited: CFrameValue;
					Pinky01_R_Original: CFrameValue;
					Foot_L_Composited: CFrameValue;
					Upperarm_R_Original: CFrameValue;
					Eye_L_end_Composited: CFrameValue;
					Pinky03_L_end_Initial: CFrameValue;
					Hand_R_Original: CFrameValue;
					Forearm_L_Original: CFrameValue;
					Shin_L_Composited: CFrameValue;
					Ring03_R_Initial: CFrameValue;
					Thigh_L_Original: CFrameValue;
					Pinky03_R_end_Initial: CFrameValue;
					Ring03_R_Original: CFrameValue;
					Pinky01_L_Initial: CFrameValue;
					Thumb02_R_Composited: CFrameValue;
					StickBone_end_Initial: CFrameValue;
					Ring02_L_Initial: CFrameValue;
					Chest_Original: CFrameValue;
					StickBone_end_Original: CFrameValue;
					Forearm_R_Composited: CFrameValue;
					StickBone_Initial: CFrameValue;
					StickBone_Composited: CFrameValue;
					HandTargetParent_R_end_Initial: CFrameValue;
					Head_Initial: CFrameValue;
					Thumb03_R_Initial: CFrameValue;
					Foot_R_Initial: CFrameValue;
					Upperarm_R_Composited: CFrameValue;
					Forearm_L_Initial: CFrameValue;
					Thumb01_L_Original: CFrameValue;
					Thumb03_R_Composited: CFrameValue;
					Ring03_L_end_Composited: CFrameValue;
					Thumb03_L_Initial: CFrameValue;
					Index01_L_Composited: CFrameValue;
					Upperarm_L_Initial: CFrameValue;
					Pinky03_R_Initial: CFrameValue;
					Thumb02_R_Initial: CFrameValue;
					Index02_L_Initial: CFrameValue;
					LegTarget_R_Original: CFrameValue;
					Ring01_L_Initial: CFrameValue;
					Thumb02_L_Composited: CFrameValue;
					Thigh_L_Composited: CFrameValue;
					Pinky03_R_end_Composited: CFrameValue;
					Pinky03_R_Composited: CFrameValue;
					WizardRig_Composited: CFrameValue;
					Pinky02_R_Initial: CFrameValue;
					Pinky01_L_Composited: CFrameValue;
					Pinky02_R_Composited: CFrameValue;
					Pinky01_R_Initial: CFrameValue;
					Foot_L_Original: CFrameValue;
					Neck_Original: CFrameValue;
					Ring03_R_end_Original: CFrameValue;
					Middle02_R_Original: CFrameValue;
					Middle01_L_Original: CFrameValue;
					Ring03_R_Composited: CFrameValue;
					Thumb01_R_Original: CFrameValue;
					Ring01_R_Initial: CFrameValue;
					Ring01_R_Original: CFrameValue;
					Middle03_L_end_Original: CFrameValue;
					Ring03_L_Composited: CFrameValue;
					Middle01_L_Composited: CFrameValue;
					Hips_Initial: CFrameValue;
					Middle03_R_end_Composited: CFrameValue;
					Pinky03_L_end_Composited: CFrameValue;
					Eye_L_Original: CFrameValue;
					Index03_L_end_Initial: CFrameValue;
					Thumb03_L_Composited: CFrameValue;
					Eye_L_Initial: CFrameValue;
					Eye_L_Composited: CFrameValue;
					HandTarget_R_end_Original: CFrameValue;
					FootFingers_L_Composited: CFrameValue;
					Middle02_L_Original: CFrameValue;
					Ring02_R_Original: CFrameValue;
					Eye_R_Initial: CFrameValue;
					Index01_R_Original: CFrameValue;
					Foot_R_Original: CFrameValue;
					Index03_R_end_Initial: CFrameValue;
					Middle03_R_end_Initial: CFrameValue;
					Middle03_R_end_Original: CFrameValue;
					Index03_R_end_Composited: CFrameValue;
					Neck_Initial: CFrameValue;
					Ring03_R_end_Composited: CFrameValue;
					Upperarm_L_Original: CFrameValue;
					Ring01_R_Composited: CFrameValue;
					Middle01_R_Original: CFrameValue;
					Middle03_L_Composited: CFrameValue;
					Index03_R_Composited: CFrameValue;
					Middle01_R_Composited: CFrameValue;
					Eye_R_Original: CFrameValue;
					Foot_L_Initial: CFrameValue;
					Ring03_L_end_Initial: CFrameValue;
					Eye_R_end_Composited: CFrameValue;
					WizardRig_Original: CFrameValue;
					Hand_R_Initial: CFrameValue;
					Middle03_L_end_Composited: CFrameValue;
					Forearm_R_Original: CFrameValue;
					Index01_L_Initial: CFrameValue;
					Index03_L_end_Composited: CFrameValue;
					LegTarget_R_end_Initial: CFrameValue;
					Eye_L_end_Original: CFrameValue;
					Thumb02_L_Original: CFrameValue;
					Thumb01_L_Composited: CFrameValue;
					Shin_L_Original: CFrameValue;
					Index03_L_end_Original: CFrameValue;
					Pinky02_L_Initial: CFrameValue;
					Ring03_L_end_Original: CFrameValue;
					Eye_L_end_Initial: CFrameValue;
					Neck_Composited: CFrameValue;
					Pinky03_L_end_Original: CFrameValue;
					Upperarm_R_Initial: CFrameValue;
					Pinky03_L_Composited: CFrameValue;
					Middle02_L_Composited: CFrameValue;
					FootFingers_R_end_Initial: CFrameValue;
				};
			};
			Librarian: Model & {
				AnimationController: AnimationController & {
					Animator: Animator;
				};
				nacked_arms: MeshPart & {
					nacked_armsMotor6D: Motor6D;
				};
				clothingSet_04_body: MeshPart & {
					clothingSet_04_bodyMotor6D: Motor6D;
				};
				RootPart: Part & {
					girlBone_root: Bone & {
						girlBone_Hips: Bone & {
							girlBone_LeftUpLeg: Bone & {
								girlBone_LeftLeg: Bone & {
									girlBone_LeftFoot: Bone & {
										girlBone_LeftToeBase: Bone;
									};
								};
							};
							girlBone_RightUpLeg: Bone & {
								girlBone_RightLeg: Bone & {
									girlBone_RightFoot: Bone & {
										girlBone_RightToeBase: Bone;
									};
								};
							};
							girlBone_Spine: Bone & {
								girlBone_Spine1: Bone & {
									girlBone_Spine2: Bone & {
										girlBone_LeftShoulder: Bone & {
											girlBone_LeftArm: Bone & {
												girlBone_LeftForeArm: Bone & {
													girlBone_LeftHand: Bone & {
														girlBone_LeftHandMiddle1: Bone & {
															girlBone_LeftHandMiddle2: Bone & {
																girlBone_LeftHandMiddle3: Bone;
															};
														};
														girlBone_LeftHandPinky1: Bone & {
															girlBone_LeftHandPinky2: Bone & {
																girlBone_LeftHandPinky3: Bone;
															};
														};
														girlBone_LeftHandIndex1: Bone & {
															girlBone_LeftHandIndex2: Bone & {
																girlBone_LeftHandIndex3: Bone;
															};
														};
														girlBone_LeftHandThumb1: Bone & {
															girlBone_LeftHandThumb2: Bone & {
																girlBone_LeftHandThumb3: Bone & {
																	girlBone_LeftHandThumb4: Bone;
																};
															};
														};
														girlBone_LeftHandRing1: Bone & {
															girlBone_LeftHandRing2: Bone & {
																girlBone_LeftHandRing3: Bone;
															};
														};
													};
												};
											};
										};
										girlBone_RightShoulder: Bone & {
											girlBone_RightArm: Bone & {
												girlBone_RightForeArm: Bone & {
													girlBone_RightHand: Bone & {
														girlBone_RightHandThumb1: Bone & {
															girlBone_RightHandThumb2: Bone & {
																girlBone_RightHandThumb3: Bone & {
																	girlBone_RightHandThumb4: Bone;
																};
															};
														};
														girlBone_RightHandIndex1: Bone & {
															girlBone_RightHandIndex2: Bone & {
																girlBone_RightHandIndex3: Bone;
															};
														};
														girlBone_RightHandMiddle1: Bone & {
															girlBone_RightHandMiddle2: Bone & {
																girlBone_RightHandMiddle3: Bone;
															};
														};
														girlBone_RightHandPinky1: Bone & {
															girlBone_RightHandPinky2: Bone & {
																girlBone_RightHandPinky3: Bone;
															};
														};
														girlBone_RightHandRing1: Bone & {
															girlBone_RightHandRing2: Bone & {
																girlBone_RightHandRing3: Bone;
															};
														};
													};
												};
											};
										};
										girlBone_Neck: Bone & {
											girlBone_Head: Bone & {
												girlBone_eyes: Bone;
											};
										};
									};
								};
							};
						};
					};
				};
				clothingSet_04_boots: MeshPart & {
					clothingSet_04_bootsMotor6D: Motor6D;
				};
				clothingSet_04_pants: MeshPart & {
					clothingSet_04_pantsMotor6D: Motor6D;
				};
				hair_01: MeshPart & {
					hair_01Motor6D: Motor6D;
				};
				InitialPoses: Folder & {
					girlBone_eyes_end_Initial: CFrameValue;
					girlBone_LeftArm_Initial: CFrameValue;
					girlBone_LeftHandPinky3_Original: CFrameValue;
					girlBone_RightHandMiddle3_Original: CFrameValue;
					girlBone_RightForeArm_Original: CFrameValue;
					girlBone_LeftHandMiddle4_Initial: CFrameValue;
					girlBone_Spine1_Composited: CFrameValue;
					girlBone_RightHandRing1_Original: CFrameValue;
					girlBone_RightHandMiddle3_Initial: CFrameValue;
					girlBone_LeftShoulder_Initial: CFrameValue;
					nacked_hair_Initial: CFrameValue;
					girlBone_LeftHand_Initial: CFrameValue;
					girlBone_RightUpLeg_Initial: CFrameValue;
					girlBone_LeftUpLeg_Composited: CFrameValue;
					girlBone_RightHandThumb3_Initial: CFrameValue;
					girlBone_LeftHandIndex2_Initial: CFrameValue;
					girlBone_RightHandPinky1_Original: CFrameValue;
					girlBone_RightHandMiddle2_Original: CFrameValue;
					girlBone_eyes_Initial: CFrameValue;
					girlBone_LeftLeg_Original: CFrameValue;
					girlBone_RightArm_Initial: CFrameValue;
					girlBone_LeftHandMiddle3_Composited: CFrameValue;
					girlBone_RightShoulder_Composited: CFrameValue;
					girlBone_LeftToeBase_Composited: CFrameValue;
					girlBone_LeftHandThumb2_Composited: CFrameValue;
					girlBone_RightHandRing2_Composited: CFrameValue;
					girlBone_RightHandIndex1_Original: CFrameValue;
					girlBone_RightShoulder_Initial: CFrameValue;
					girlBone_RightHandThumb4_Original: CFrameValue;
					girlBone_root_Initial: CFrameValue;
					girlBone_RightHandRing4_Composited: CFrameValue;
					girlBone_RightToe_End_Original: CFrameValue;
					girlBone_Spine2_Composited: CFrameValue;
					girlBone_RightHandThumb2_Initial: CFrameValue;
					girlBone_Spine_Composited: CFrameValue;
					girlBone_LeftFoot_Original: CFrameValue;
					girlBone_LeftHandRing2_Initial: CFrameValue;
					girlBone_LeftShoulder_Composited: CFrameValue;
					girlBone_LeftHandPinky1_Composited: CFrameValue;
					girlBone_LeftHandRing1_Initial: CFrameValue;
					girlBone_LeftHandRing3_Original: CFrameValue;
					girlBone_LeftHandIndex3_Composited: CFrameValue;
					nacked_arms_Composited: CFrameValue;
					girlBone_LeftHandThumb3_Original: CFrameValue;
					girlBone_RightLeg_Initial: CFrameValue;
					girlBone_LeftHandRing2_Original: CFrameValue;
					girlBone_Spine2_Initial: CFrameValue;
					girlBone_Hips_Initial: CFrameValue;
					girlBone_RightHandMiddle3_Composited: CFrameValue;
					girlBone_RightArm_Original: CFrameValue;
					girlBone_LeftFoot_Composited: CFrameValue;
					girlBone_Hips_Composited: CFrameValue;
					girlBone_RightHandRing1_Initial: CFrameValue;
					girlBone_RightHandMiddle1_Initial: CFrameValue;
					girlBone_RightHandPinky1_Composited: CFrameValue;
					clothingSet_04_body_Composited: CFrameValue;
					girlBone_RightArm_Composited: CFrameValue;
					girlBone_LeftHandIndex2_Original: CFrameValue;
					girlBone_RightHandThumb4_Composited: CFrameValue;
					girlBone_RightHandIndex2_Composited: CFrameValue;
					girlBone_RightHandIndex3_Original: CFrameValue;
					girlBone_LeftHandThumb2_Initial: CFrameValue;
					clothingSet_04_body_Initial: CFrameValue;
					clothingSet_04_boots_Composited: CFrameValue;
					face_Initial: CFrameValue;
					girlBone_LeftHandMiddle3_Initial: CFrameValue;
					girlBone_RightHandRing3_Original: CFrameValue;
					girlBone_LeftHandThumb3_Initial: CFrameValue;
					girlBone_RightHandThumb4_Initial: CFrameValue;
					face_Original: CFrameValue;
					girlBone_LeftHandMiddle2_Composited: CFrameValue;
					girlBone_RightHandMiddle2_Composited: CFrameValue;
					girlBone_Spine1_Original: CFrameValue;
					nacked_arms_Original: CFrameValue;
					girlBone_LeftToeBase_Original: CFrameValue;
					girlBone_RightToeBase_Original: CFrameValue;
					girlBone_LeftHandThumb1_Original: CFrameValue;
					hair_01_Initial: CFrameValue;
					girlBone_RightHandThumb1_Composited: CFrameValue;
					girlBone_RightHandIndex4_Initial: CFrameValue;
					girlBone_LeftHandPinky2_Composited: CFrameValue;
					girlBone_LeftLeg_Composited: CFrameValue;
					hair_01_Original: CFrameValue;
					hair_01_Composited: CFrameValue;
					girlBone_RightHandIndex1_Initial: CFrameValue;
					nacked_hair_Original: CFrameValue;
					nacked_hair_Composited: CFrameValue;
					girlBone_LeftHandMiddle3_Original: CFrameValue;
					girlBone_RightFoot_Initial: CFrameValue;
					girlBone_LeftLeg_Initial: CFrameValue;
					clothingSet_04_pants_Original: CFrameValue;
					girlBone_RightHandMiddle4_Original: CFrameValue;
					girlBone_RightToe_End_Initial: CFrameValue;
					girlBone_LeftHandThumb1_Composited: CFrameValue;
					girlBone_LeftForeArm_Initial: CFrameValue;
					girlBone_RightHandMiddle1_Composited: CFrameValue;
					girlBone_Spine2_Original: CFrameValue;
					girlBone_RightHandIndex4_Original: CFrameValue;
					girlBone_root_Composited: CFrameValue;
					girlBone_LeftUpLeg_Initial: CFrameValue;
					clothingSet_04_boots_Original: CFrameValue;
					girlBone_LeftHandMiddle4_Composited: CFrameValue;
					girlBone_RightToe_End_Composited: CFrameValue;
					girlBone_LeftHandRing4_Original: CFrameValue;
					girlBone_LeftHandMiddle2_Original: CFrameValue;
					girlBone_LeftHandIndex4_Composited: CFrameValue;
					girlBone_RightToeBase_Initial: CFrameValue;
					girlBone_RightToeBase_Composited: CFrameValue;
					girlBone_LeftHandIndex4_Initial: CFrameValue;
					girlBone_RightFoot_Original: CFrameValue;
					girlBone_RightHandMiddle4_Composited: CFrameValue;
					girlBone_RightHandRing2_Original: CFrameValue;
					girlBone_RightLeg_Original: CFrameValue;
					girlBone_RightLeg_Composited: CFrameValue;
					girlBone_LeftToe_End_Initial: CFrameValue;
					girlBone_RightUpLeg_Composited: CFrameValue;
					girlBone_LeftHandIndex2_Composited: CFrameValue;
					girlBone_RightHandPinky3_Composited: CFrameValue;
					girlBone_RightForeArm_Composited: CFrameValue;
					girlBone_LeftHandMiddle1_Composited: CFrameValue;
					girlBone_RightHandThumb3_Composited: CFrameValue;
					girlBone_eyes_end_Original: CFrameValue;
					girlBone_RightHandPinky4_Initial: CFrameValue;
					girlBone_LeftHandRing2_Composited: CFrameValue;
					girlBone_LeftShoulder_Original: CFrameValue;
					girlBone_RightHandPinky4_Original: CFrameValue;
					girlBone_RightUpLeg_Original: CFrameValue;
					girlBone_RightHandPinky3_Initial: CFrameValue;
					girlBone_Neck_Composited: CFrameValue;
					girlBone_LeftHandPinky4_Initial: CFrameValue;
					girlBone_RightHandPinky4_Composited: CFrameValue;
					girlBone_RightHandMiddle1_Original: CFrameValue;
					girlBone_Spine_Original: CFrameValue;
					girlBone_Head_Composited: CFrameValue;
					girlBone_RightHandPinky2_Initial: CFrameValue;
					girlBone_RightHandPinky2_Original: CFrameValue;
					girlBone_RightHandPinky2_Composited: CFrameValue;
					girlBone_RightHandPinky1_Initial: CFrameValue;
					girlBone_RightHandRing4_Initial: CFrameValue;
					girlBone_RightHand_Initial: CFrameValue;
					girlBone_RightHandRing4_Original: CFrameValue;
					girlBone_LeftArm_Original: CFrameValue;
					girlBone_RightHandRing3_Composited: CFrameValue;
					girlBone_RightHandRing2_Initial: CFrameValue;
					girlBone_RightHandIndex3_Composited: CFrameValue;
					girlBone_RightFoot_Composited: CFrameValue;
					girlBone_LeftHandPinky2_Initial: CFrameValue;
					girlBone_RightHandMiddle4_Initial: CFrameValue;
					clothingSet_04_pants_Composited: CFrameValue;
					girlBone_LeftHandIndex3_Original: CFrameValue;
					girlBone_RightHandMiddle2_Initial: CFrameValue;
					girlBone_LeftHandIndex1_Initial: CFrameValue;
					girlBone_LeftToe_End_Original: CFrameValue;
					girlBone_LeftHandMiddle1_Original: CFrameValue;
					girlBone_LeftHandPinky4_Composited: CFrameValue;
					girlBone_LeftHandIndex3_Initial: CFrameValue;
					nacked_arms_Initial: CFrameValue;
					girlBone_LeftUpLeg_Original: CFrameValue;
					clothingSet_04_boots_Initial: CFrameValue;
					girlBone_LeftHandThumb3_Composited: CFrameValue;
					girlBone_Neck_Original: CFrameValue;
					girlBone_eyes_Original: CFrameValue;
					girlBone_LeftHand_Composited: CFrameValue;
					girlBone_LeftHand_Original: CFrameValue;
					girlBone_LeftHandPinky3_Composited: CFrameValue;
					girlBone_RightHandIndex2_Initial: CFrameValue;
					girlBone_RightHandIndex2_Original: CFrameValue;
					girlBone_RightHandIndex1_Composited: CFrameValue;
					girlBone_LeftHandThumb4_Original: CFrameValue;
					clothingSet_04_body_Original: CFrameValue;
					girlBone_LeftHandIndex1_Composited: CFrameValue;
					girlBone_RightHandThumb1_Original: CFrameValue;
					girlBone_RightHandThumb2_Original: CFrameValue;
					girlBone_LeftHandThumb1_Initial: CFrameValue;
					clothingSet_04_pants_Initial: CFrameValue;
					girlBone_RightHandThumb3_Original: CFrameValue;
					girlBone_RightHandThumb1_Initial: CFrameValue;
					girlBone_RightHandRing1_Composited: CFrameValue;
					girlBone_RightHandIndex4_Composited: CFrameValue;
					girlBone_LeftHandPinky1_Initial: CFrameValue;
					girlBone_RightForeArm_Initial: CFrameValue;
					girlBone_RightHand_Composited: CFrameValue;
					girlBone_LeftHandIndex1_Original: CFrameValue;
					girlBone_LeftHandPinky3_Initial: CFrameValue;
					girlBone_LeftHandMiddle1_Initial: CFrameValue;
					girlBone_RightHand_Original: CFrameValue;
					girlBone_LeftHandPinky4_Original: CFrameValue;
					girlBone_RightHandRing3_Initial: CFrameValue;
					girlBone_LeftHandThumb4_Composited: CFrameValue;
					girlBone_eyes_Composited: CFrameValue;
					girlBone_RightShoulder_Original: CFrameValue;
					girlBone_LeftForeArm_Composited: CFrameValue;
					girlBone_LeftHandRing1_Composited: CFrameValue;
					girlBone_LeftHandPinky2_Original: CFrameValue;
					girlBone_eyes_end_Composited: CFrameValue;
					girlBone_Head_Initial: CFrameValue;
					girlBone_Head_Original: CFrameValue;
					girlBone_LeftFoot_Initial: CFrameValue;
					girlBone_LeftArm_Composited: CFrameValue;
					girlBone_RightHandPinky3_Original: CFrameValue;
					girlBone_LeftHandThumb4_Initial: CFrameValue;
					girlBone_LeftToeBase_Initial: CFrameValue;
					girlBone_LeftHandRing1_Original: CFrameValue;
					girlBone_LeftHandRing3_Composited: CFrameValue;
					girlBone_LeftHandRing3_Initial: CFrameValue;
					girlBone_Spine_Initial: CFrameValue;
					girlBone_LeftHandMiddle2_Initial: CFrameValue;
					face_Composited: CFrameValue;
					girlBone_LeftHandRing4_Initial: CFrameValue;
					girlBone_root_Original: CFrameValue;
					girlBone_LeftHandThumb2_Original: CFrameValue;
					girlBone_Hips_Original: CFrameValue;
					girlBone_RightHandThumb2_Composited: CFrameValue;
					girlBone_LeftHandPinky1_Original: CFrameValue;
					girlBone_Neck_Initial: CFrameValue;
					girlBone_RightHandIndex3_Initial: CFrameValue;
					girlBone_LeftHandMiddle4_Original: CFrameValue;
					girlBone_Spine1_Initial: CFrameValue;
					girlBone_LeftHandIndex4_Original: CFrameValue;
					girlBone_LeftForeArm_Original: CFrameValue;
					girlBone_LeftToe_End_Composited: CFrameValue;
					girlBone_LeftHandRing4_Composited: CFrameValue;
				};
				face: MeshPart & {
					faceMotor6D: Motor6D;
				};
			};
		};
	};
	["Central Park"]: SpawnLocation;
}
