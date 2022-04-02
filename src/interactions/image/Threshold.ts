import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class ThresholdCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "threshold",
      description: "threshold an avatar",
      options: [
        {
          name: "user",
          description: "A user",
          type: "USER",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction<"cached">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const user = interaction.options.getUser("user") ?? interaction.user;
    const image = `${this.APIs.Threshold}${user.displayAvatarURL({ format: "png" })}`;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
      .setImage(image);

    await interaction.reply({ embeds: [embed] });
  }
}
