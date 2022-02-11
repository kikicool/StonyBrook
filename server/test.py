class BowlingGame:
    def __init__(self):
        self.rolls = []

    def roll(self, pins):
        self.validate_roll(pins) #Check Input Validation
        self.rolls.append(pins) #If there is no error, input is appended to rolls' array

    def score(self):
        final_score = 0 #Final Score
        roll_index = 0 #roll_index is used for dintincting strike or not.

        for frame_index in range(10):
            if(self.rolls[roll_index] == 10): #For strike
                final_score += 10 + self.rolls[roll_index + 1] + self.rolls[roll_index + 2]
                roll_index += 1
            elif(self.rolls[roll_index] + self.rolls[roll_index + 1] == 10): #For Spare
                final_score += self.rolls[roll_index] + self.rolls[roll_index + 1] + self.rolls[roll_index + 2]
                roll_index += 2
            else: #For Open frame
                final_score += self.rolls[roll_index] + self.rolls[roll_index + 1]
                roll_index += 2
        return final_score

    def validate_roll(self, pins):
        self.more_than_10_pins(pins)
        self.out_of_scope_roll(pins)
        self.rolled_more_than_21_times()
        self.the_10th_frames(pins)

    def out_of_scope_roll(self, pins):
        if pins > 10 or pins < 0:
            raise Exception("Roll is out of scope")

    def more_than_10_pins(self, pins):
        if (len(self.rolls) - self.rolls.count(10)) % 2 == 1: # Is the 2nd roll in Frame?
            if self.rolls[-1] + pins > 10:
                raise Exception("Frame can not score more than 10 points")

    def rolled_more_than_21_times(self):
        if len(self.rolls) > 20:
            raise Exception("Game is over")

    def the_10th_frames(self, pins):
        if self.is_bouns_roll():
            extra_strike = self.is_strike(len(self.rolls) - 2)
            extra_spare = self.is_spare(len(self.rolls) - 2)
            if not extra_strike and not extra_spare:
                raise Exception("Game already has ten frames")
            
            if extra_strike and self.rolls[len(self.rolls) - 1] != 10:
                if self.rolls[-1] + pins > 10:
                    raise Exception("Bonus frame can not score more than 10 points")

    def is_bouns_roll(self):
        first_roll_in_frame = 0
        frame = 1

        while frame < 10 and first_roll_in_frame + 2 < len(self.rolls):

            if self.is_strike(first_roll_in_frame):
                first_roll_in_frame += 1
                frame += 1
            else:
                first_roll_in_frame += 2
                frame += 1

        return frame == 10 and first_roll_in_frame + 2 == len(self.rolls)

    def is_strike(self, first_roll_in_frame):
        return self.rolls[first_roll_in_frame] == 10

    def is_spare(self, first_roll_in_frame):
        return self.rolls[first_roll_in_frame] + self.rolls[first_roll_in_frame + 1] == 10
