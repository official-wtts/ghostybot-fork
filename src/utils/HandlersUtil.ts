import { resolve } from "path";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command";
import { SubCommand } from "structures/Command/SubCommand";
import { Event } from "structures/Event";
import { Feature } from "structures/Feature";
import { Helper } from "structures/Helper";
import { Command as CommandInteraction } from "structures/Command/Command";

type Structures = Command | Event | Feature | Helper | SubCommand | CommandInteraction;

export async function resolveFile<T>(file: string, bot: Bot): Promise<T | null> {
  const resolvedPath = resolve(file);

  const File = await (await import(resolvedPath)).default;

  if (!File?.constructor) return null;

  return new File(bot) as T;
}

export async function validateFile(file: string, item: Structures) {
  const type = getType(item);

  if (!item.name) {
    throw new TypeError(`[ERROR][${type}]: name is required for ${type}! (${file})`);
  }

  if (!item.execute) {
    throw new TypeError(`[ERROR][${type}]: execute function is required for ${type}! (${file})`);
  }
}

function getType(item: Structures) {
  if (item instanceof Command) {
    return "COMMAND";
  }
  if (item instanceof Event) {
    return "EVENT";
  }
  if (item instanceof Feature) {
    return "FEATURE";
  }
  if (item instanceof Helper) {
    return "HELPER";
  }
  if (item instanceof CommandInteraction) {
    return "COMMAND_INTERACTION";
  }
  if (item instanceof SubCommand) {
    return "SUB_COMMAND";
  }
}
